using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ReversiMvcApp.Data;
using ReversiMvcApp.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text.Json;
using System.Threading.Tasks;

namespace ReversiMvcApp.Controllers
{
    public class HomeController : Controller
    {
        private IEnumerable<Spel> Spellen { get; set; }
        private readonly ILogger<HomeController> _logger;
        private ReversiDbContext db = new ReversiDbContext();
        private readonly IHttpClientFactory _clientFactory;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [Authorize]
        public IActionResult Index()
        {
            ClaimsPrincipal currentUser = this.User;
            var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;

            if (db.Speler.Find(currentUserID) == null)
            {
                Speler speler = new Speler();
                speler.Guid = currentUserID;
                db.Speler.Add(speler);
                db.SaveChanges();
            }

            var getSpellen = GetSpellen();
            getSpellen.Wait();

            IEnumerable<Spel> spellen = getSpellen.Result;

            return View(spellen);
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

        private async Task<IEnumerable<Spel>> GetSpellen()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5001/api/spel");
            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode) 
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                Spellen = await JsonSerializer.DeserializeAsync<IEnumerable<Spel>>(responseStream);
                return Spellen;
            } else
            {
                Spellen = Array.Empty<Spel>();
                return Spellen;
            }
        }
    }
}
