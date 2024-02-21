using Microsoft.EntityFrameworkCore;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{
    public class ShoppingListContext : DbContext
    {
        public ShoppingListContext(DbContextOptions<ShoppingListContext> options) : base(options) { }
        public DbSet<Product> Products { get; set; } = null!;
        public DbSet<Category> Categories { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "חלב וביצים", CategoryQuantity = 0 },
            new Category { Id = 2, Name = "ירקות ופירות", CategoryQuantity = 0 },
            new Category { Id = 3, Name = "מוצרי ניקיון", CategoryQuantity = 0 },
            new Category { Id = 4, Name = "מאפים", CategoryQuantity = 0 },
            new Category { Id = 5, Name = "מוצרי חלב", CategoryQuantity = 0 }
            );

            // Make Operation field unique

            modelBuilder.Entity<Product>()
                .HasOne(e => e.Category)
                .WithMany(e => e.Products)
                .HasForeignKey(e => e.CategoryId)
                .IsRequired();

           
        }


    }
}
