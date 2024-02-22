using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ShoppingListWebAPI.Server.Models
{

    public class Category
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CategoryQuantity { get; set; }
        public ICollection<Product> Products { get; } = new List<Product>();

        public void AddProduct (Product product) => Products.Add(product);

    }
}
