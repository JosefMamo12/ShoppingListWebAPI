using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{
    public interface ICategoryRepo: IShoppingListRepo<Category>
    {
        IEnumerable<Category> GetAllCategories();
        IEnumerable<Category> GetCategoriesProducts();
    }
}
