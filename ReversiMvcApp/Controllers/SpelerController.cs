using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReversiMvcApp.Controllers
{
    public class SpelerController : Controller
    {
        // GET: Speler
        public ActionResult Index()
        {
            return View();
        }

        // GET: Speler/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Speler/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Speler/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Speler/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Speler/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: Speler/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Speler/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}
