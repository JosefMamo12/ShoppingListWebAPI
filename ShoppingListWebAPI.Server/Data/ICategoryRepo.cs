using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{
    public interface ICategoryRepo
    {
        bool SaveChanges();
        IEnumerable<Category> GetAllCategories();
        int GetAllCategoriesQuantity();
        Category? GetCategory(int id);
    }

}
