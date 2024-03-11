using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShoppingListWebAPI.Server.Data;
using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepo _categoryRepo;

        public CategoryController(ICategoryRepo categoryRepo, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepo = categoryRepo;
        }
        [HttpGet]
        public ActionResult<CategoryReadDto> Index()
        {

            Console.WriteLine("--> Get All Categories...");
            var categoriesItems = _categoryRepo.GetAllCategories();
            return Ok(_mapper.Map<IEnumerable<CategoryReadDto>>(categoriesItems));

        }

        [HttpGet("{id:int}")]
        public ActionResult<CategoryReadDto> GetCategory(int id)
        {
            try
            {
                CategoryReadDto categoryReadDto = _mapper.Map<CategoryReadDto>(_categoryRepo.GetCategory(id));
                return Ok(categoryReadDto);
            }
            catch (Exception e)
            {
                return BadRequest($"---> Failed to retrive Category from db, error: {e.Message}");
            }
        }
        [HttpGet]
        [Route("sum")]
        public ActionResult<int> CategoriesSum()
        {
            try
            {
                return Ok(_categoryRepo.GetAllCategoriesQuantity());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}