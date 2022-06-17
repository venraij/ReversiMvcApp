using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReversiMvcApp.Data;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Controllers
{
    public class SpelerController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IConfiguration _configuration;
        private readonly string _baseApiUrl;

        public SpelerController(
            IConfiguration configuration,
            ApplicationDbContext context,
            UserManager<IdentityUser> userManager)
        {
            _context = context;
            _userManager = userManager;
            _configuration = configuration;
            _baseApiUrl = _configuration["ApiUrl"] + "/";
        }

        // GET: Speler
        public async Task<IActionResult> Index()
        {
            return View(await _context.Speler.ToListAsync());
        }

        // GET: Speler/Details/5
        [Authorize(Roles = "Beheerder")]
        public async Task<IActionResult> Details(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var speler = await _context.Speler
                .FirstOrDefaultAsync(m => m.Guid == id);
            if (speler == null)
            {
                return NotFound();
            }

            return View(speler);
        }

        // GET: Speler/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Speler/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Guid,Naam,AantalGewonnen,AantalVerloren,AantalGelijk")] Speler speler)
        {
            if (ModelState.IsValid)
            {
                _context.Add(speler);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(speler);
        }

        // GET: Speler/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var speler = await _context.Speler.FindAsync(id);
            if (speler == null)
            {
                return NotFound();
            }
            return View(speler);
        }
        
        // GET: Speler/Manage/5
        public async Task<IActionResult> Manage(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var speler = await _context.Speler.FindAsync(id);
            if (speler == null)
            {
                return NotFound();
            }
            return View(speler);
        }


        // POST: Speler/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(string id, [Bind("Guid,Naam,AantalGewonnen,AantalVerloren,AantalGelijk")] Speler speler)
        {
            if (id != speler.Guid)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(speler);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!SpelerExists(speler.Guid))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(speler);
        }
        
        // POST: Speler/Details/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Beheerder")]
        public async Task<IActionResult> Details([FromForm] string Guid, [FromForm] int Rol)
        {
            var user = await _userManager.FindByIdAsync(Guid);
            var speler = await _context.Speler.FindAsync(Guid);
            
            if (await _userManager.IsInRoleAsync(user, ((Models.Rol)Rol).ToString()))
            {
                return View(speler);
            }

            await _userManager.AddToRoleAsync(user, ((Models.Rol)Rol).ToString());
            speler.Rol = (Models.Rol)Rol;
            await _context.SaveChangesAsync();

            return RedirectToAction("Index");
        }

        // GET: Speler/Delete/5
        public async Task<IActionResult> Delete(string id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var speler = await _context.Speler
                .FirstOrDefaultAsync(m => m.Guid == id);
            if (speler == null)
            {
                return NotFound();
            }

            return View(speler);
        }

        // POST: Speler/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "Beheerder,Mediator")]
        public async Task<IActionResult> DeleteConfirmed([FromForm] string Guid)
        {
            var speler = await _context.Speler.FindAsync(Guid);

            if (speler == null)
            {
                return RedirectToAction(nameof(Index));
            }
            
            string apiUrl = _baseApiUrl + "spel/Speler?spelerToken=" + Guid;

            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri(apiUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(
                    new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));
                
                HttpResponseMessage response = await client.DeleteAsync(apiUrl);
                    
                if (response.IsSuccessStatusCode)
                {
                    _context.Speler.Remove(speler);
                    await _context.SaveChangesAsync();
                    return RedirectToAction(nameof(Index));                
                }
            }

            return View(speler);
        }

        private bool SpelerExists(string id)
        {
            return _context.Speler.Any(e => e.Guid == id);
        }
        
        // PUT: Speler/Scores
        [HttpPut]
        public async Task<IActionResult> Scores([FromBody] Spel spel)
        {
            var spelerZwart = await _context.Speler.FindAsync(spel.Speler1token);
            var spelerWit = await _context.Speler.FindAsync(spel.Speler2token);
            
            var zwartScore = 0;
            var witScore = 0;

            foreach (var kleur in spel.Bord)
            {
                if (kleur == Kleur.Wit)
                {
                    witScore++;
                } else if (kleur == Kleur.Zwart)
                {
                    zwartScore++;
                }
            }
            
            if (witScore > zwartScore)
            {
                spelerWit.AantalGewonnen++;
                spelerZwart.AantalVerloren++;
            } else if (witScore == zwartScore)
            {
                spelerWit.AantalGelijk++;
                spelerZwart.AantalGelijk++;
            } else if (zwartScore > witScore)
            {
                spelerZwart.AantalGewonnen++;
                spelerWit.AantalVerloren++;
            }
            
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
