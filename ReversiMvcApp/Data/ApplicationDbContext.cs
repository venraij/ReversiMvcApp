using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using ReversiMvcApp.Models;

namespace ReversiMvcApp.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public DbSet<Speler> Speler { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        
        public ApplicationDbContext()
        {
        }
        
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=localhost;Database=s1149241;User Id=SA;Password=NickAlmelo69");
        }
    }
}
