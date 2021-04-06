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

        public Task<ProductDto> GetProductById(int id);

        public IEnumerable<Product> GetAllProducts();

        public IEnumerable<ProductDto> GetAllProductsInCategory(string category);

        public IEnumerable<string> GetAllConditions();
    }
}
