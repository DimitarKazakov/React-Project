using System;
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

        [HttpGet("{name}")]
        public async Task<User> GetByUsername(string name)
        {
            return await userService.GetByUsername(name);
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
    }
}
