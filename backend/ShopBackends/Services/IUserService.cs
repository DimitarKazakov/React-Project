using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ShopBackend.Dtos;
using ShopBackend.Models;

namespace ShopBackend.Services
{
    public interface IUserService
    {
        Task<UserProfileDto> GetByEmail(string email);

        Task<User> GetByProductId(int id);

        Task<ResultDto> Register(UserLoginDto user);

        Task<bool> Login(UserLoginDto user);

        int GetLikesProductsCount(string email);

        int GetWishListedProductsCount(string email);

        Task<bool> CreateMessage(MessageDto message);

        Task<IEnumerable<UserMessageDto>> GetUserMessages(string email);

        IEnumerable<ProductDto> GetUserProducts(string email);

        IEnumerable<ProductDto> GetUserLikedProducts(string email);

        IEnumerable<ProductDto> GetUserWishedProducts(string email);
    }
}
