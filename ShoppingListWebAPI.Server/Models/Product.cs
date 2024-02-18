namespace ShoppingListWebAPI.Server.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int CategoryId { get; set; } 
        public int Quantity { get; set; }
        public required Category Category { get; set; }


    }
}