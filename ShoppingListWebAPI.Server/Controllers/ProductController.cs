using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using NuGet.Protocol;
using ShoppingListWebAPI.Server.Data;
using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly ShoppingListContext _context;

        public ProductController(ShoppingListContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Products()
        {
            return await _context.Products.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult> AddProduct(DTOProduct p)
        {
            try
            {
                await AddProcess(p);
                return Ok("Product Updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private async Task AddProcess(DTOProduct product)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var newItem = _context.Products.FirstOrDefault(e => e.Name == product.ProductName);
                if (newItem != null)
                {
                    newItem.Quantity++;
                    UpdateCategory(newItem.CategoryId);
                }
                else
                {
                    Product newProduct = DTOProduct.ToEntity(product);
                    _context.Products.Add(newProduct);
                    UpdateCategory(newProduct.CategoryId);
                }
                await _context.SaveChangesAsync();
                transaction.Commit();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

        }

        private void UpdateCategory(int categoryId)
        {
            var category = _context.Categories.FirstOrDefault(c => c.Id == categoryId);
            if (category != null)
            {
                category.CategoryQuantity++;
            }
        }
    }

}



