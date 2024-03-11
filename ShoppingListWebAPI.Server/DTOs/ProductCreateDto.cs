namespace ShoppingListWebAPI.Server.DTOs
{
    public class ProductCreateDto
    {

        public string? Name { get; set; }
        public int CategoryId { get; set; }
        public int Quantity { get; set; }


    }
}
