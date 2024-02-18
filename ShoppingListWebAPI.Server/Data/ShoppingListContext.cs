using Microsoft.EntityFrameworkCore;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{
    public class ShoppingListContext : DbContext
    {
        public ShoppingListContext (DbContextOptions<ShoppingListContext> options): base(options) { }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }

    }


}
