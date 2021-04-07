using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopBackend.Models;
using System.Linq;
using ShopBackend.Dtos;

namespace ShopBackend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;

        public UserService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<bool> CreateMessage(MessageDto message)
        {
            var user = await _dbContext.Users.FirstAsync(x => x.Username.ToLower() == message.To.ToLower());
            await _dbContext.Messages.AddAsync(new Message
            {
                ContactLink = message.ContactLink,
                Subject = message.Subject,
                Content = message.Content,
                CreatedOn = DateTime.Now,
                From = message.From,
                User = user
            });

            await _dbContext.SaveChangesAsync();
            return true;
        }

        public async Task<User> GetByProductId(int id)
        {
            return await _dbContext.Products.Where(x => x.Id == id).Select(x => x.User).FirstAsync();
        }

        public async Task<User> GetByEmail(string email)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == email);
        }

        public int GetLikesProductsCount(string email)
        {
            return _dbContext.ReactedProducts.Where(x => x.User.Email == email && x.Liked == true).Count();
        }

        public int GetWishListedProductsCount(string email)
        {
            return _dbContext.ReactedProducts.Where(x => x.User.Email == email && x.Wishlisted == true).Count();
        }

        public async Task<bool> Login(UserLoginDto user)
        {
            var account = await CheckUser(user);
            if (account == null || account.Password != user.Password)
            {
                return false;
            }

            return true;
        }

        public async Task<ResultDto> Register(UserLoginDto user)
        {
            var res = new ResultDto();
            var account = await CheckUser(user);
            if (account != null)
            {
                res.Message = "There is user with this email";
                return res;
            }

            if (user.Password != user.ConfirmPassword)
            {
                res.Message = "Passwords should match";
                return res;
            }

            if (account != null && user.Username == account.Username)
            {
                res.Message = "There is user with this username";
                return res;
            }

            await _dbContext.Users.AddAsync(new User
            {
                Email = user.Email,
                CreatedOn = DateTime.Now,
                Password = user.Password,
                Username = user.Username,
            });

            await _dbContext.SaveChangesAsync();
            res.Message = "Ok";
            return res;
        }

        private async Task<User> CheckUser(UserLoginDto user)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
        }
    }
}
