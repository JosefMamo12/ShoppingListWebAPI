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
        [Route("add")]
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
        [Route("subtract")]
        [HttpPost]
        public async Task<ActionResult> SubtractProduct(DTOProduct p)
        {
            try
            {
                await SubtractProcess(p);
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
        private async Task SubtractProcess(DTOProduct dTOProduct)
        {
            var transaction = _context.Database.BeginTransaction();
            try
            {
                var product = _context.Products.FirstOrDefault(p => p.Name == dTOProduct.ProductName);
                if (product != null)
                {
                    product.Quantity--;
                    var category = await _context.Categories.FirstOrDefaultAsync(c => c.Id == product.CategoryId);
                    if (category != null)
                    {
                        category.CategoryQuantity--;
                    }
                    if (product.Quantity == 0)
                    {
                        _context.Products.Remove(product);
                    }
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
        [HttpDelete("{id:int}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
                if (product != null)
                {
                    var transaction = _context.Database.BeginTransaction();
                    _context.Products.Remove(product);
                    var category = _context.Categories.FirstOrDefault(c => c.Id == product.CategoryId);
                    if (category != null)
                    {
                        category.CategoryQuantity -= product.Quantity;
                    }
                    transaction.Commit();
                    _context.SaveChanges();
                    return Ok("Successed remove product");
                }

                return Ok("Not found the product");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }

}