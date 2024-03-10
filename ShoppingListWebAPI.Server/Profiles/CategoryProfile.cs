
using AutoMapper;
using ShoppingListWebAPI.Server.DTOs;
using ShoppingListWebAPI.Server.Models;

namespace ShoppingListWebAPI.Server.Profiles
{
    public class CategoryProfile : Profile
    {

        public CategoryProfile()
        {
            CreateMap<Category, CategoryReadDto>();
        }

    }
}