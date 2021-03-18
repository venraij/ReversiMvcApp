using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using ReversiMvcApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text.Json;

namespace ReversiMvcApp.Views.Home
{
    public class SpellenList
    {
        public IEnumerable<Spel> Spellen { get; set; }
        private readonly IHttpClientFactory _clientFactory;

        private async void GetSpellen()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:5001/api/spel");
            var client = _clientFactory.CreateClient();

            var response = await client.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                using var responseStream = await response.Content.ReadAsStreamAsync();
                Spellen = await JsonSerializer.DeserializeAsync<IEnumerable<Spel>>(responseStream);
            }
            else
            {
                Spellen = Array.Empty<Spel>();
            }
        }
    }
}
