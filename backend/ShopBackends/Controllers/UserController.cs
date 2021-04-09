using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ShopBackend.Dtos;
using ShopBackend.Models;
using ShopBackend.Services;

namespace ShopBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService userService)
        {
            this.userService = userService;
        }

        //[HttpGet("id")]
        //public async Task<User> GetById(int id)
        //{
        //    return await productService.GetProductById(id);
        //}

        [HttpGet("{email}")]
        public async Task<UserProfileDto> GetByEmail(string email)
        {
            return await userService.GetByEmail(email);
        }

        [HttpGet("product/{id}")]
        public async Task<User> GetByProductId(int id)
        {
            return await userService.GetByProductId(id);
        }

        [HttpPost("login")]
        public async Task<bool> Login([FromBody] UserLoginDto user)
        {
            return await userService.Login(user);
        }

        [HttpPost("register")]
        public async Task<ResultDto> Register([FromBody] UserLoginDto user)
        {
            return await userService.Register(user);
        }

        [HttpPost("message")]
        public async Task<bool> MessageUser([FromBody] MessageDto message)
        {
            return await userService.CreateMessage(message);
        }

        [HttpGet("likedProducts/{email}")]
        public int GetLikesProductsCount(string email)
        {
            return userService.GetLikesProductsCount(email);
        }

        [HttpGet("wishProducts/{email}")]
        public int GetWishListedProductsCount(string email)
        {
            return userService.GetWishListedProductsCount(email);
        }

        [HttpGet("messages/{email}")]
        public async Task<IEnumerable<UserMessageDto>> GetUserMessages(string email)
        {
            return await userService.GetUserMessages(email);
        }

        [HttpGet("products/{email}")]
        public IEnumerable<ProductDto> GetUserProducts(string email)
        {
            return userService.GetUserProducts(email);
        }

        [HttpGet("products/liked/{email}")]
        public IEnumerable<ProductDto> GetUserLikedProducts(string email)
        {
            return userService.GetUserLikedProducts(email);
        }

        [HttpGet("products/wished/{email}")]
        public IEnumerable<ProductDto> GetUserWishedProducts(string email)
        {
            return userService.GetUserWishedProducts(email);
        }
    }
}
