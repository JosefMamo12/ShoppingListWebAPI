using Microsoft.AspNetCore.Mvc;
using ShoppingListWebAPI.Server.Data;

namespace ShoppingListWebAPI.Server.Controllers
{
    public class CategoryController : ControllerBase
    {
        private ShoppingListContext _context;
        public CategoryController(ShoppingListContext context) {
            _context = context;
        }
        [HttpGet]
        public IActionResult Index()
        {
            var Categories = _context.Categories.ToList();
            return Ok(Categories);
        }

    }
}
