using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopBackend.Models;
using System.Linq;
using ShopBackend.Dtos;
using System.Collections.Generic;

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

        public async Task<UserProfileDto> GetByEmail(string email)
        {
            var user = await _dbContext.Users.Where(x => x.Email.ToLower() == email.ToLower() || x.Username.ToLower() == email.ToLower()).Select(x => new UserProfileDto
            {
                Id = x.Id,
                Address = x.Address,
                CreatedOn = x.CreatedOn.ToString("dd/MM/yyyy"),
                Email = x.Email,
                Products = x.Products.Count(),
                Phone = x.Phone,
                Photo = x.Photo,
                RealName = x.RealName,
                Town = x.Town,
                Username = x.Username,
                ProductArr = x.Products

            }).FirstOrDefaultAsync();

            if (user == null)
            {
                return new UserProfileDto();
            }

            user.Likes = _dbContext.ReactedProducts.Where(x => user.ProductArr.Select(p => p.Id).Contains(x.Id)).Count();
            return user;
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
                Photo = "https://www.thumbayclinic.com/wp-content/uploads/2018/05/default-user-image.png",
            });

            await _dbContext.SaveChangesAsync();
            res.Message = "Ok";
            return res;
        }

        private async Task<User> CheckUser(UserLoginDto user)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Email == user.Email);
        }

        public async Task<IEnumerable<UserMessageDto>> GetUserMessages(string email)
        {
            var user = await _dbContext.Users.FirstAsync(x => x.Email == email);
            return _dbContext.Messages.Where(x => x.UserId == user.Id).OrderByDescending(x => x.CreatedOn)
            .Select(x => new UserMessageDto
            {
                Subject = x.Subject,
                ContactLink = x.ContactLink,
                Content = x.Content,
                From = x.From,
                To = x.User.Username,
                CreatedOn = x.CreatedOn.ToString("dd/MM/yyyy"),
                Id = x.Id
            }).ToList();
        }


        public IEnumerable<ProductDto> GetUserProducts(string email)
        {
            return _dbContext.Products
                             .Where(x => x.User.Username.ToLower() == email.ToLower() || x.User.Email.ToLower() == email.ToLower())
                             .OrderByDescending(x => x.CreatedOn)
                             .Select(x => new ProductDto
                             {
                                 Id = x.Id,
                                 IsFreeShipping = x.IsFreeShipping,
                                 Name = x.Name,
                                 Description = x.Description,
                                 Category = x.Category.Name,
                                 Condition = x.Condition.Name,
                                 Image = x.Image,
                                 CreatedOn = x.CreatedOn.ToString("dd/MM/yyyy"),
                                 Price = x.Price,
                                 ProductWords = x.ProductWords.Select(x => x.KeyWord.Name).ToArray(),
                                 User = x.User.Username,
                                 Likes = x.ReactedProducts.Select(x => x.Liked).Count(),
                                 Email = x.User.Email
                             })
                             .ToList();
        }

        public IEnumerable<ProductDto> GetUserLikedProducts(string email)
        {
            return _dbContext.ReactedProducts
                             .Where(x => (x.User.Username.ToLower() == email.ToLower() || x.User.Email.ToLower() == email.ToLower()) && x.Liked == true)
                             .OrderByDescending(x => x.Product.CreatedOn)
                             .Select(x => new ProductDto
                             {
                                 Id = x.Product.Id,
                                 IsFreeShipping = x.Product.IsFreeShipping,
                                 Name = x.Product.Name,
                                 Description = x.Product.Description,
                                 Category = x.Product.Category.Name,
                                 Condition = x.Product.Condition.Name,
                                 Image = x.Product.Image,
                                 CreatedOn = x.Product.CreatedOn.ToString("dd/MM/yyyy"),
                                 Price = x.Product.Price,
                                 ProductWords = x.Product.ProductWords.Select(x => x.KeyWord.Name).ToArray(),
                                 User = x.User.Username,
                                 Likes = x.Product.ReactedProducts.Select(x => x.Liked).Count(),
                                 Email = x.User.Email
                             })
                             .ToList();
        }

        public IEnumerable<ProductDto> GetUserWishedProducts(string email)
        {
            return _dbContext.ReactedProducts
                             .Where(x => (x.User.Username.ToLower() == email.ToLower() || x.User.Email.ToLower() == email.ToLower()) && x.Wishlisted == true)
                             .OrderByDescending(x => x.Product.CreatedOn)
                             .Select(x => new ProductDto
                             {
                                 Id = x.Product.Id,
                                 IsFreeShipping = x.Product.IsFreeShipping,
                                 Name = x.Product.Name,
                                 Description = x.Product.Description,
                                 Category = x.Product.Category.Name,
                                 Condition = x.Product.Condition.Name,
                                 Image = x.Product.Image,
                                 CreatedOn = x.Product.CreatedOn.ToString("dd/MM/yyyy"),
                                 Price = x.Product.Price,
                                 ProductWords = x.Product.ProductWords.Select(x => x.KeyWord.Name).ToArray(),
                                 User = x.User.Username,
                                 Likes = x.Product.ReactedProducts.Select(x => x.Liked).Count(),
                                 Email = x.User.Email
                             })
                             .ToList();
        }
    }
}
