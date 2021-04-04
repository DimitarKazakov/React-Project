using System;
using System.Threading.Tasks;
using ShopBackend.Models;

namespace ShopBackend.Services
{
    public interface IUserService
    {
        Task<User> GetByUsername(string username);

        Task<User> GetByProductId(int id);

    }
}
