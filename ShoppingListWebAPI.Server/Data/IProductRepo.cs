using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{
    public interface IProductRepo
    {
        IEnumerable<Product> GetProducts();
        void AddProduct(Product p);
        void SubtractProduct(Product p);
        bool SaveChanges();
    }
}