
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.DTOs
{
    public class ProductReadDto
    {
        public string? ProductName { get; set; }
        public int CategoryId { get; set; }
        public Category? Category { get; set; }
        public int Quantity { get; set; }


    }


}
