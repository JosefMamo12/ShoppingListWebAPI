using Microsoft.EntityFrameworkCore;
using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Data
{

    public class CategoryRepo : ICategoryRepo
    {
        private readonly ShoppingListContext _context;

        public CategoryRepo(ShoppingListContext context)
        {
            _context = context;
        }

        public IEnumerable<Category> GetAllCategories()
        {
            return _context.Categories.ToList();
        }

        public int GetAllCategoriesQuantity()
        {
            var sum = _context.Categories.Sum(c => c.CategoryQuantity);
            return sum;
        }

        public bool SaveChanges()
        {
            return _context.SaveChanges() >= 0;
        }

    }
}