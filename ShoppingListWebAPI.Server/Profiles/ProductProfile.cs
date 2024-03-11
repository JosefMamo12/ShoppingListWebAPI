using AutoMapper;
using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            //Source - Target
            CreateMap<Product, ProductReadDto>();
            CreateMap<ProductCreateDto, Product>();

        }
    }
}