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
            new Category { Id = 1, Title = "חלב וביצים", TotalQuantity = 0 },
            new Category { Id = 2, Title = "ירקות ופירות", TotalQuantity = 0 },
            new Category { Id = 3, Title = "מוצרי ניקיון", TotalQuantity = 0 },
            new Category { Id = 4, Title = "מאפים", TotalQuantity = 0 },
            new Category { Id = 5, Title = "מוצרי חלב", TotalQuantity = 0 }
            );

            // Make Operation field unique
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasIndex(e => e.Title).IsUnique();
            });

        }

    }


}
