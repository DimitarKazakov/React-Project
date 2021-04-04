using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopBackend.Dtos;
using ShopBackend.Models;

namespace ShopBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly ApplicationDbContext _dbContext;

        public ProductService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task CreateProduct(AddProductDto product)
        {
            var user = await _dbContext.Users.FirstAsync(x => x.Email == product.UserEmail);
            var category = await this.GetCategory(product.Category);
            var condition = await this.GetCondition(product.Condition);

            var dbProduct = new Product
            {
                Name = product.Name,
                Description = product.Description,
                IsFreeShipping = product.IsFreeShipping,
                CreatedOn = DateTime.Now,
                Image = product.Image,
                Price = decimal.Parse(product.Price),
                User = user,
                Category = category,
                Condition = condition,
            };
            await _dbContext.Products.AddAsync(dbProduct);

            await _dbContext.SaveChangesAsync();

            await this.AddKeyWords(product.KeyWords, dbProduct);
        }

        public IEnumerable<string> GetAllConditions()
        {
            return _dbContext.Conditions.Select(x => x.Name).ToList();
        }

        public IEnumerable<Product> GetAllProducts()
        {
            return _dbContext.Products.ToList();
        }

        public IEnumerable<ProductDto> GetAllProductsInCategory(string category)
        {
            return _dbContext.Products
                             .Where(x => x.Category.Name.ToLower() == category.ToLower())
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
                             })
                             .ToList();

        }

        public async Task<ProductDto> GetProductById(int id)
        {
            return await _dbContext.Products.Select(x => new ProductDto
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
            }).FirstAsync(x => x.Id == id);
        }

        private async Task AddKeyWords(IEnumerable<string> keyWords, Product product)
        {
            foreach (var word in keyWords)
            {
                var dbWord = await _dbContext.KeyWords.FirstOrDefaultAsync(x => x.Name == word);
                if (dbWord == null)
                {
                    dbWord = new KeyWord
                    {
                        Name = word,
                    };

                    await _dbContext.KeyWords.AddAsync(dbWord);
                }
                await _dbContext.ProductWords.AddAsync(new ProductWord
                {
                    KeyWord = dbWord,
                    Product = product
                });

            }

            await _dbContext.SaveChangesAsync();
        }
        private async Task<Category> GetCategory(string name)
        {
            var category = await _dbContext.Categories.FirstOrDefaultAsync(x => x.Name == name);
            if (category == null)
            {
                category = new Category
                {
                    Name = name,
                };
                await _dbContext.Categories.AddAsync(category);
                await _dbContext.SaveChangesAsync();
            }

            return category;
        }

        private async Task<Condition> GetCondition(string name)
        {
            var condition = await _dbContext.Conditions.FirstOrDefaultAsync(x => x.Name == name);
            if (condition == null)
            {
                condition = new Condition
                {
                    Name = name,
                };
                await _dbContext.Conditions.AddAsync(condition);
                await _dbContext.SaveChangesAsync();
            }

            return condition;
        }
    }
}
