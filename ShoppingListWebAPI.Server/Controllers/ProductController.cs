using Microsoft.AspNetCore.Mvc;
using ShoppingListWebAPI.Server.Data;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ShoppingListContext _context;

        public ProductController(ShoppingListContext context)
        {
            _context = context;
        }
        [HttpGet]
        public IActionResult Index()
        {
            try
            {
                var result = _context.Products.ToList();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpPost]
        public IActionResult Create([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest("Invalid product data");
            }

            try
            {
                _context.Products.Add(product);
                _context.SaveChanges();
                return Ok(product);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
