using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using ReversiMvcApp.Data;
using ReversiMvcApp.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace ReversiMvcApp.Controllers
{
    public class HomeController : Controller
    {
        private ReversiDbContext db = new ReversiDbContext();
        private readonly ILogger<HomeController> _logger;
        private bool alreadyConnected;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            string apiUrl = "https://localhost:5001/api/spel";

            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (db.Speler.Find(currentUserID) == null)
            {
                Speler speler = new Speler();
                speler.Guid = currentUserID;
                db.Speler.Add(speler);
                db.SaveChanges();
            }

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response = await client.GetAsync(apiUrl);
                if (response.IsSuccessStatusCode)
                {
                    var data = await response.Content.ReadAsStringAsync();
                    var spelList = Newtonsoft.Json.JsonConvert.DeserializeObject<IEnumerable<Spel>>(data);
                    List<Spel> spelListNo2nd = new List<Spel>();
                    
                    foreach (Spel spel in spelList)
                    {
                        if (spel.Speler1token == currentUserID || spel.Speler2token == currentUserID)
                        {
                            return RedirectToAction("Details", "Home", spel);
                        }

                        if (String.IsNullOrEmpty(spel.Speler2token))
                        {
                            spelListNo2nd.Add(spel);
                        }
                    }

                    return View(spelListNo2nd);
                }
                else
                {
                    return View(new List<Spel>());
                }
            }
        }

        [Authorize]
        public IActionResult Create()
        {
            return View();
        }

        [Authorize]
        public IActionResult Details(Spel spel)
        {
            ClaimsPrincipal currentUser = User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (spel.Speler1token == currentUserID || spel.Speler2token == currentUserID)
            {
                ViewData["Connected"] = true;
            } else
            {
                ViewData["Connected"] = false;
            }
            return View(spel);
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(string omschrijving)
        {
            string apiUrl = "https://localhost:5001/api/spel";
            string currentUserID = this.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            Spel spel = new Spel();
            spel.Omschrijving = omschrijving;
            spel.Speler1token = currentUserID;

            string json = System.Text.Json.JsonSerializer.Serialize<Spel>(spel);
            StringContent content = new StringContent(json, Encoding.UTF8, "application/json");

            try
            {   
                using (HttpClient client = new HttpClient())
                {
                    var response = await client.PostAsync(apiUrl, content);

                    if (response.StatusCode == System.Net.HttpStatusCode.Created)
                    {
                        return View();
                    } else
                    {
                        string returnValue = response.Content.ReadAsStringAsync().Result;
                        throw new Exception($"Failed to POST data: ({response.StatusCode}): {returnValue}");
                    }
                }
            }
            catch
            {
                
            }

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
