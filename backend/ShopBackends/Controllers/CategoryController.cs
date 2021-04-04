using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Dtos;
using ShopBackend.Models;

namespace ShopBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoryController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet("all")]
        public IEnumerable<CategoryDto> GetAll()
        {
            return _dbContext.Categories.Select(x => new CategoryDto
            {
                ProductsCount = x.Products.Count,
                Id = x.Id,
                Image = x.Image,
                Name = x.Name,
                Products = x.Products,
            }).ToList();
        }
    }
}
