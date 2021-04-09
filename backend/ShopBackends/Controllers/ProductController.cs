using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using ShopBackend.Dtos;
using ShopBackend.Models;
using ShopBackend.Services;

namespace ShopBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpGet("all")]
        public IEnumerable<ProductDto> GetAll()
        {
            return productService.GetAllProducts();
        }

        [HttpGet("all/count")]
        public int GetAllCount()
        {
            return productService.GetAllProductsCount();
        }

        [HttpGet("all/{email}")]
        public IEnumerable<ProductDto> GetAllUserProducts(string email)
        {
            return productService.GetAllProductsOfUser(email);
        }

        [HttpGet("category/{category}")]
        public IEnumerable<ProductDto> GetAllInCategory(string category)
        {
            if (category.ToLower() == "all")
            {
                return productService.GetAllProducts();
            }
            return productService.GetAllProductsInCategory(category);
        }

        [HttpGet("conditions")]
        public IEnumerable<string> GetAllConditions()
        {
            return productService.GetAllConditions();
        }

        [HttpGet("productById/{id}")]
        public async Task<ProductDto> GetById(int id)
        {
            return await productService.GetProductById(id);
        }

        [HttpPost("add")]

        public async Task<bool> Create([FromBody] AddProductDto productDto)
        {
            return await productService.CreateProduct(productDto);
        }
    }
}
