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
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

namespace ReversiMvcApp.Controllers
{
    public class HomeController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();
        private readonly IConfiguration _configuration;
        private readonly string _baseApiUrl;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
            _baseApiUrl = _configuration["ApiUrl"] + "/";
        }

        [Authorize]
        public async Task<IActionResult> Index()
        {
            string apiUrl = _baseApiUrl + "spel";

            ClaimsPrincipal currentUser = User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            Speler speler = db.Speler.Find(currentUserID);
            int amountSpelers = db.Speler.Count();
            
            if (speler == null)
            {
                speler = new Speler();
                speler.Guid = currentUserID;
                speler.Naam = currentUser.Identity.Name;
                speler.Rol = Rol.Speler;

                if (amountSpelers == 0)
                {
                }

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
                    var spelList = JsonConvert.DeserializeObject<IEnumerable<Spel>>(data);
                    List<Spel> spelListNo2nd = new List<Spel>();
                    
                    foreach (Spel spel in spelList)
                    {
                        if (spel.Speler1token == currentUserID || spel.Speler2token == currentUserID)
                        {
                            return RedirectToAction("Details", "Home", speler);
                        }

                        if (String.IsNullOrEmpty(spel.Speler2token))
                        {
                            spelListNo2nd.Add(spel);
                        }
                    }

                    return View(spelListNo2nd);
                }

                return View(new List<Spel>());
            }
        }

        [Authorize]
        public IActionResult Create()
        {
            return View();
        }

        [Authorize]
        public async Task<IActionResult> Details([FromQuery] Spel spel, [FromQuery] string Guid)
        {
            var currentUser = User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            Speler speler = db.Speler.Find(currentUserID);

            if (Guid != null)
            {
                ViewData["Connected"] = true;
                return View(spel);
            }

            if (spel.Speler1token == null)
            {
                return RedirectToAction("Index", "Home");
            }

            if (spel.Speler1token == currentUserID || spel.Speler2token == currentUserID)
            {
                ViewData["Connected"] = true;
                return View(spel);
            } 
            
            if (spel.Speler2token == null && spel.Speler1token != currentUserID)
            {
                spel.Speler2token = currentUserID;
                string apiUrl = _baseApiUrl + "spel/meespelen";

                using (HttpClient client = new HttpClient())
                {
                    client.BaseAddress = new Uri(apiUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(
                        new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                    
                    var content = new StringContent(JsonConvert.SerializeObject(spel), Encoding.UTF8, "application/json");
                    
                    HttpResponseMessage response = await client.PatchAsync(apiUrl, content);
                    
                    if (response.IsSuccessStatusCode)
                    {
                        ViewData["Connected"] = true;
                        return RedirectToAction("Details", "Home", speler);
                    }
                }
            }
            
            ViewData["Connected"] = false;
            return RedirectToAction("Index", "Home");
        }

        [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(string omschrijving)
        {
            string apiUrl = _baseApiUrl + "spel";
            string currentUserID = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            Spel spel = new Spel();
            spel.Omschrijving = omschrijving;
            spel.Speler1token = currentUserID;

            string json = JsonConvert.SerializeObject(spel);
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
