using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
    }
}
