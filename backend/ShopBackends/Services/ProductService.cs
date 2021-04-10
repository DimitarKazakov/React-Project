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

        public async Task<bool> CreateProduct(AddProductDto product)
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

            return true;
        }

        public async Task<bool> Delete(int id)
        {
            var product = await this._dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null)
            {
                return false;
            }

            this._dbContext.Products.Remove(product);
            await this._dbContext.SaveChangesAsync();
            return true;
        }

        public IEnumerable<string> GetAllConditions()
        {
            return _dbContext.Conditions.Select(x => x.Name).ToList();
        }

        public int GetAllProductsCount()
        {
            return _dbContext.Products.Count();
        }


        public async Task<ProductDto> GetProductById(int id, string user)
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
                Likes = x.ReactedProducts.Where(x => x.Liked == true).Select(x => x.Liked).Count(),
                Email = x.User.Email,
                React = x.ReactedProducts.FirstOrDefault(y => y.User.Email.ToLower() == user || y.User.Username.ToLower() == user),
            }).FirstAsync(x => x.Id == id);
        }

        public async Task LikeProduct(LikedProductDto productDto)
        {
            var react = await this._dbContext.ReactedProducts.FirstOrDefaultAsync(x => x.ProductId == productDto.Id);
            if (react == null)
            {
                var user = await _dbContext.Users.FirstAsync(x => x.Email.ToLower() == productDto.User.ToLower() || x.Username.ToLower() == productDto.User.ToLower());
                var product = await _dbContext.Products.FirstAsync(x => x.Id == productDto.Id);
                await _dbContext.AddAsync(new ReactedProduct
                {
                    User = user,
                    Product = product,
                    Liked = true,
                    Wishlisted = false
                });
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                if (react.Liked == true)
                {
                    react.Liked = false;
                }
                else
                {
                    react.Liked = true;
                }

                await _dbContext.SaveChangesAsync();
            }
        }

        public async Task WishProduct(WishedProduct productDto)
        {
            var react = await this._dbContext.ReactedProducts.FirstOrDefaultAsync(x => x.ProductId == productDto.Id);
            if (react == null)
            {
                var user = await _dbContext.Users.FirstAsync(x => x.Email.ToLower() == productDto.User.ToLower() || x.Username.ToLower() == productDto.User.ToLower());
                var product = await _dbContext.Products.FirstAsync(x => x.Id == productDto.Id);
                await _dbContext.AddAsync(new ReactedProduct
                {
                    User = user,
                    Product = product,
                    Liked = false,
                    Wishlisted = true
                });
                await _dbContext.SaveChangesAsync();
            }
            else
            {
                if (react.Wishlisted == true)
                {
                    react.Wishlisted = false;
                }
                else
                {
                    react.Wishlisted = true;
                }

                await _dbContext.SaveChangesAsync();
            }
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

        public IEnumerable<ProductDto> GetAllProducts(string user, string currentUser, string order, string search)
        {
            var products = _dbContext.Products.Select(x => new ProductDto
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
                Likes = x.ReactedProducts.Where(x => x.Liked == true).Select(x => x.Liked).Count(),
                Email = x.User.Email,
                React = x.ReactedProducts.FirstOrDefault(y => y.User.Email.ToLower() == currentUser || y.User.Username.ToLower() == currentUser),
                DbCreatedOn = x.CreatedOn
            })
            .ToList();

            if (!string.IsNullOrWhiteSpace(search) && search != "nosearch")
            {
                products = products.Where(x => x.Name.ToLower().Contains(search.ToLower()) || x.ProductWords.Contains(search)).ToList();
            }

            if (order.ToLower() == "oldest")
            {
                products = products.OrderBy(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "newest")
            {
                products = products.OrderByDescending(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "likes")
            {
                products = products.OrderByDescending(x => x.Likes).ToList();
            }
            else
            {
                products = products.OrderBy(x => x.Likes).ToList();
            }

            return products;
        }

        public IEnumerable<ProductDto> GetAllProductsOfUser(string user, string currentUser, string order, string search)
        {
            var products = _dbContext.Products
                             .Where(x => x.User.Email.ToLower() == user.ToLower())
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
                                 Likes = x.ReactedProducts.Where(x => x.Liked == true).Select(x => x.Liked).Count(),
                                 Email = x.User.Email,
                                 DbCreatedOn = x.CreatedOn
                             })
                             .ToList();

            if (!string.IsNullOrWhiteSpace(search) && search != "nosearch")
            {
                products = products.Where(x => x.Name.ToLower().Contains(search.ToLower()) || x.ProductWords.Contains(search)).ToList();
            }

            if (order.ToLower() == "oldest")
            {
                products = products.OrderBy(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "newest")
            {
                products = products.OrderByDescending(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "likes")
            {
                products = products.OrderByDescending(x => x.Likes).ToList();
            }
            else
            {
                products = products.OrderBy(x => x.Likes).ToList();
            }

            return products;
        }

        public IEnumerable<ProductDto> GetAllProductsInCategory(string category, string user, string currentUser, string order, string search)
        {
            var products = _dbContext.Products
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
                                 Likes = x.ReactedProducts.Where(x => x.Liked == true).Select(x => x.Liked).Count(),
                                 Email = x.User.Email,
                                 React = x.ReactedProducts.FirstOrDefault(y => y.User.Email.ToLower() == currentUser || y.User.Username.ToLower() == currentUser),
                                 DbCreatedOn = x.CreatedOn
                             })
                             .ToList();

            if (!string.IsNullOrWhiteSpace(search) && search != "nosearch")
            {
                products = products.Where(x => x.Name.ToLower().Contains(search.ToLower()) || x.ProductWords.Contains(search)).ToList();
            }

            if (order.ToLower() == "oldest")
            {
                products = products.OrderBy(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "newest")
            {
                products = products.OrderByDescending(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "likes")
            {
                products = products.OrderByDescending(x => x.Likes).ToList();
            }
            else
            {
                products = products.OrderBy(x => x.Likes).ToList();
            }

            return products;

        }

        public IEnumerable<ProductDto> GetAllLikedProducts(string user, string currentUser, string order, string search)
        {
            var products = _dbContext.ReactedProducts
                             .Where(x => (x.User.Username.ToLower() == user.ToLower() || x.User.Email.ToLower() == user.ToLower()) && x.Liked == true)
                             .Select(x => new ProductDto
                             {
                                 Id = x.Id,
                                 IsFreeShipping = x.Product.IsFreeShipping,
                                 Name = x.Product.Name,
                                 Description = x.Product.Description,
                                 Category = x.Product.Category.Name,
                                 Condition = x.Product.Condition.Name,
                                 Image = x.Product.Image,
                                 CreatedOn = x.Product.CreatedOn.ToString("dd/MM/yyyy"),
                                 Price = x.Product.Price,
                                 ProductWords = x.Product.ProductWords.Select(x => x.KeyWord.Name).ToArray(),
                                 User = x.Product.User.Username,
                                 Likes = x.Product.ReactedProducts.Where(x => x.Liked == true).Select(x => x.Liked).Count(),
                                 Email = x.Product.User.Email,
                                 React = x,
                                 DbCreatedOn = x.Product.CreatedOn
                             })
                             .ToList();

            if (!string.IsNullOrWhiteSpace(search) && search != "nosearch")
            {
                products = products.Where(x => x.Name.ToLower().Contains(search.ToLower()) || x.ProductWords.Contains(search)).ToList();
            }

            if (order.ToLower() == "oldest")
            {
                products = products.OrderBy(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "newest")
            {
                products = products.OrderByDescending(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "likes")
            {
                products = products.OrderByDescending(x => x.Likes).ToList();
            }
            else
            {
                products = products.OrderBy(x => x.Likes).ToList();
            }

            return products;
        }

        public IEnumerable<ProductDto> GetAllWishedProducts(string user, string currentUser, string order, string search)
        {
            var products = _dbContext.ReactedProducts
                             .Where(x => (x.User.Username.ToLower() == user.ToLower() || x.User.Email.ToLower() == user.ToLower()) && x.Wishlisted == true)
                             .Select(x => new ProductDto
                             {
                                 Id = x.Id,
                                 IsFreeShipping = x.Product.IsFreeShipping,
                                 Name = x.Product.Name,
                                 Description = x.Product.Description,
                                 Category = x.Product.Category.Name,
                                 Condition = x.Product.Condition.Name,
                                 Image = x.Product.Image,
                                 CreatedOn = x.Product.CreatedOn.ToString("dd/MM/yyyy"),
                                 Price = x.Product.Price,
                                 ProductWords = x.Product.ProductWords.Select(x => x.KeyWord.Name).ToArray(),
                                 User = x.Product.User.Username,
                                 Likes = x.Product.ReactedProducts.Where(x => x.Liked == true).Select(x => x.Liked).Count(),
                                 Email = x.Product.User.Email,
                                 React = x,
                                 DbCreatedOn = x.Product.CreatedOn
                             })
                             .ToList();

            if (!string.IsNullOrWhiteSpace(search) && search != "nosearch")
            {
                products = products.Where(x => x.Name.ToLower().Contains(search.ToLower()) || x.ProductWords.Contains(search)).ToList();
            }

            if (order.ToLower() == "oldest")
            {
                products = products.OrderBy(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "newest")
            {
                products = products.OrderByDescending(x => x.DbCreatedOn).ToList();
            }
            else if (order.ToLower() == "likes")
            {
                products = products.OrderByDescending(x => x.Likes).ToList();
            }
            else
            {
                products = products.OrderBy(x => x.Likes).ToList();
            }

            return products;
        }

        public async Task<bool> Update(int id, AddProductDto productDto)
        {
            var product = await this._dbContext.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product == null)
            {
                return false;
            }

            var category = await this.GetCategory(productDto.Category);
            var condition = await this.GetCondition(productDto.Condition);

            product.Name = productDto.Name;
            product.Description = productDto.Description;
            product.IsFreeShipping = productDto.IsFreeShipping;
            product.Image = productDto.Image;
            product.Price = decimal.Parse(productDto.Price);
            product.Category = category;
            product.Condition = condition;

            await _dbContext.SaveChangesAsync();

            await _dbContext.SaveChangesAsync();

            return true;
        }
    }
}
