using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ReversiMvcApp.Data;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Controllers
{
    public class SpelerController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SpelerController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Speler
        public async Task<IActionResult> Index()
        {
            return View(await _context.Speler.ToListAsync());
        }

        // GET: Speler/Details/5
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
        public async Task<IActionResult> DeleteConfirmed(string id)
        {
            var speler = await _context.Speler.FindAsync(id);
            _context.Speler.Remove(speler);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
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
