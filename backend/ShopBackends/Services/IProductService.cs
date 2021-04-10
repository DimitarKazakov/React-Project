using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ShopBackend.Dtos;
using ShopBackend.Models;

namespace ShopBackend.Services
{
    public interface IProductService
    {
        public Task<bool> CreateProduct(AddProductDto product);

        public Task<bool> Delete(int id);

        public Task<bool> Update(int id, AddProductDto productDto);

        public Task<ProductDto> GetProductById(int id, string user);

        public int GetAllProductsCount();

        public IEnumerable<string> GetAllConditions();

        public Task LikeProduct(LikedProductDto productDto);

        public Task WishProduct(WishedProduct productDto);



        public IEnumerable<ProductDto> GetAllProducts(string user, string currentUser, string order, string search);

        public IEnumerable<ProductDto> GetAllProductsOfUser(string user, string currentUser, string order, string search);

        public IEnumerable<ProductDto> GetAllProductsInCategory(string category, string user, string currentUser, string order, string search);

        public IEnumerable<ProductDto> GetAllLikedProducts(string user, string currentUser, string order, string search);

        public IEnumerable<ProductDto> GetAllWishedProducts(string user, string currentUser, string order, string search);

    }
}
