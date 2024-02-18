using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ShoppingListWebAPI.Server.Models
{

    public class Category
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int TotalQuantity { get; set; }

        // Navigation property to represent the one-to-many relationship
        public virtual  ICollection<Product>? Products { get; set;}

        

    }
}
