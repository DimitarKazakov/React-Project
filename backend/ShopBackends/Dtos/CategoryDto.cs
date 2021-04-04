using System;
using ShopBackend.Models;

namespace ShopBackend.Dtos
{
    public class CategoryDto : Category
    {
        public CategoryDto()
        {
        }

        public int ProductsCount { get; set; }
    }
}
