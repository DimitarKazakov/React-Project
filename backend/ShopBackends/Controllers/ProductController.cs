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

        [HttpGet("all/count")]
        public int GetAllCount()
        {
            return productService.GetAllProductsCount();
        }

        [HttpGet("category/{category}/{user}/{currentUser}/{order}/{search}")]
        public IEnumerable<ProductDto> GetAllInCategory(string category, string user, string currentUser, string order, string search)
        {
            if (category.ToLower() == "all")
            {
                return productService.GetAllProducts(user, currentUser, order, search);
            }

            if (category.ToLower() == "user")
            {
                return productService.GetAllProductsOfUser(user, currentUser, order, search);
            }

            if (category.ToLower() == "liked")
            {
                return productService.GetAllLikedProducts(user, currentUser, order, search);

            }

            if (category.ToLower() == "wished")
            {
                return productService.GetAllWishedProducts(user, currentUser, order, search);

            }

            return productService.GetAllProductsInCategory(category, user, currentUser, order, search);
        }

        [HttpGet("conditions")]
        public IEnumerable<string> GetAllConditions()
        {
            return productService.GetAllConditions();
        }

        [HttpGet("productById/{id}/{user}")]
        public async Task<ProductDto> GetById(int id, string user)
        {
            return await productService.GetProductById(id, user);
        }

        [HttpPost("add")]
        public async Task<bool> Create([FromBody] AddProductDto productDto)
        {
            return await productService.CreateProduct(productDto);
        }

        [HttpPost("like")]
        public async Task Like([FromBody] LikedProductDto productDto)
        {
            await productService.LikeProduct(productDto);
        }

        [HttpPost("wish")]
        public async Task Wish([FromBody] WishedProduct productDto)
        {
            await productService.WishProduct(productDto);
        }

        [HttpDelete("delete/{id}")]
        public async Task<bool> Delete(int id)
        {
            return await productService.Delete(id);
        }

        [HttpPut("update/{id}")]
        public async Task<bool> Update(int id, [FromBody] AddProductDto productDto)
        {
            return await productService.Update(id, productDto);
        }
    }
}
