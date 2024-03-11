using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShoppingListWebAPI.Server.Data;
using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepo _productRepo;
        private readonly IMapper _mapper;

        public ProductController(IProductRepo productRepo, IMapper mapper)
        {
            _productRepo = productRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Product>> Products()
        {
            return Ok(_productRepo.GetProducts());
        }
        [Route("add")]
        [HttpPost]
        public ActionResult<Product> AddProduct(ProductCreateDto productCreateDto)
        {
            try
            {
                Console.WriteLine("---> Adding Products");
                Product product = _mapper.Map<Product>(productCreateDto);
                _productRepo.AddProduct(product);
                _productRepo.SaveChanges();
                return Ok("Product Updated");
            }
            catch (Exception ex)
            {
                Console.WriteLine("---> Failed to adding product");
                return BadRequest(ex.Message);
            }
        }
        [Route("subtract")]
        [HttpPost]
        public ActionResult SubtractProduct(ProductCreateDto productCreateDto)
        {
            try
            {
                Product product = _mapper.Map<Product>(productCreateDto);
                _productRepo.SubtractProduct(product);
                _productRepo.SaveChanges();
                return Ok("Product Updated");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id:int}")]
        public ActionResult Delete(int id)
        {
            try
            {
                _productRepo.DeleteProduct(id);
                _productRepo.SaveChanges();
                return Ok("Successed remove product");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        [HttpPut("{id:int}")]
        public ActionResult<Product> UpdateProduct(int id, ProductCreateDto productCreateDto)
        {
            try
            {

                Console.WriteLine($"ProductCreateDto Name={productCreateDto.Name}, Quantity={productCreateDto.Quantity}, CategoryId={productCreateDto.CategoryId}");
                Product editProduct = _mapper.Map<Product>(productCreateDto);
                Console.WriteLine(editProduct);
                var product = _productRepo.UpdateProduct(id, editProduct);
                var rValue = _mapper.Map<ProductReadDto>(product);
                _productRepo.SaveChanges();
                return Ok(rValue);
            }
            catch (Exception error)
            {
                Console.WriteLine("---> Error while trying to update product");
                return BadRequest($"Failed to update product with id: {id}, Error: {error.Message}");
            }
        }

    }
}