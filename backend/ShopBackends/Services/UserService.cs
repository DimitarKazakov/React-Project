using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopBackend.Models;
using System.Linq;

namespace ShopBackend.Services
{
    public class UserService : IUserService
    {
        private readonly ApplicationDbContext _dbContext;

        public UserService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> GetByProductId(int id)
        {
            return await _dbContext.Products.Where(x => x.Id == id).Select(x => x.User).FirstAsync();
        }

        public async Task<User> GetByUsername(string username)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(x => x.Username == username);
        }
    }
}
