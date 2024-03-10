using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.DTOs
{

    public class CategoryReadDto
    {
        public int Id { get; set; }
        public String? Name { get; set; }
        public String? CategoryQuantity { get; set; }
        public ICollection<Product> Products { get; set; } = null!;
    }

}