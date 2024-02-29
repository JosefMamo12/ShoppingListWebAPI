namespace ShoppingListWebAPI.Server.DTOs
{
    public class DTOListProduct
    {
        public int Id { get; set; }
        public String Name { get; set; } = null!;
        public int Quantity { get; set; }
    }
}
