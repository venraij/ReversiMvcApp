using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReversiMvcApp.Models
{
    public class Spel
    {
        public string Token { get; set; }
        public string Omschrijving { get; set; }
        public string Speler1token { get; set; }
        public string Speler2token { get; set; }
    }
}
