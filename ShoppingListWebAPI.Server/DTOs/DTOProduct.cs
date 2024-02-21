using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.DTOs
{
    public class DTOProduct
    {
        public int CategoryId { get; set; }
        public string ProductName { get; set; } = null!;

        public static Product ToEntity(DTOProduct dTOProduct)
        {
            return new Product() { Name = dTOProduct.ProductName, CategoryId = dTOProduct.CategoryId, Quantity = 1 };
        }
    }


}
