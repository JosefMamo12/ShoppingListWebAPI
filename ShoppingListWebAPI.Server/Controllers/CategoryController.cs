using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingListWebAPI.Server.Data;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly ShoppingListContext _context;
        public CategoryController(ShoppingListContext context)
        {
            _context = context;
        }
        [HttpGet]
        public Category[] Get()
        {
            Category[] categories = [.. _context.Categories];
            return categories;
        }

    }
}
