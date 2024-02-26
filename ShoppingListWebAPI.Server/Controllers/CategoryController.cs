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

        public async Task<ActionResult<Category>> Index()
        {
            try
            {
                var Categories = await _context.Categories.ToListAsync();
                return Ok(Categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("products")]
        public async Task<ActionResult<Category>> CategoriesProducts()
        {
            try
            {
                var Categories = await _context.Categories.Select(c => new { c.Name, c.Products }).ToListAsync();
                return Ok(Categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("sum")]
        public ActionResult<int> CategoriesSum()
        {
            try
            {
                var sum = _context.Categories.Sum(c => c.CategoryQuantity);
                return Ok(sum);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}