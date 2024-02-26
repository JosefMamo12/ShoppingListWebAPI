using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace ShoppingListWebAPI.Server.Models


{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int Quantity { get; set; }
        public int CategoryId { get; set; }
        public virtual Category Category { get; set; } = null!;

    }
}