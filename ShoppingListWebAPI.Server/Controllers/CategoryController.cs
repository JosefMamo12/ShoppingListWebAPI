using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShoppingListWebAPI.Server.Data;
using ShoppingListWebAPI.Server.DTOs;
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
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Category>> GetCategoryByProductID(int id)
        {
            try
            {
                var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product == null)
                {
                    return NotFound($"Product with Id = {id} not found");
                }
                var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == product.CategoryId);
                return Ok(category);
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
                var Categories = await _context.Categories.Select(c => new { c.Id, c.Name, c.Products }).ToListAsync();
                return Ok(Categories);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet]
        [Route("products/{id:int}")]
        public async Task<ActionResult<DTOListProduct>> ProductsByCategoy(int id)
        {
            try
            {
                List<DTOListProduct> dTOListProducts = [];
                var products = await _context.Categories.Where(c => c.Id == id).SelectMany(c => c.Products).ToListAsync();
                foreach (var product in products)
                {
                    dTOListProducts.Add(new DTOListProduct { Id = product.Id, Name = product.Name, Quantity = product.Quantity });
                }
                return Ok(dTOListProducts);
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