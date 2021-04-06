using System;
using System.Threading.Tasks;
using ShopBackend.Dtos;
using ShopBackend.Models;

namespace ShopBackend.Services
{
    public interface IUserService
    {
        Task<User> GetByUsername(string username);

        Task<User> GetByProductId(int id);

        Task<ResultDto> Register(UserLoginDto user);

        Task<bool> Login(UserLoginDto user);

        int GetLikesProductsCount(string email);

        int GetWishListedProductsCount(string email);

        Task<bool> CreateMessage(MessageDto message);
    }
}
