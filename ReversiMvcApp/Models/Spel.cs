namespace ReversiMvcApp.Models
{
    public class Spel
    {
        public string Token { get; set; }
        public string Omschrijving { get; set; }
        public string Speler1token { get; set; }
        public string Speler2token { get; set; }
        public Kleur[,] Bord { get; set; }
    }

    public enum Kleur
    {
        Geen,
        Wit,
        Zwart
    }
}
