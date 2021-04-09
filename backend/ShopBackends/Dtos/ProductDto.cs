using System;
using System.Collections.Generic;

namespace ShopBackend.Dtos
{
    public class ProductDto
    {
        public ProductDto()
        {
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string[] ProductWords { get; set; }

        public int ProductWordsLength => ProductWords.Length;

        public string Description { get; set; }

        public string Email { get; set; }

        public decimal Price { get; set; }

        public string Image { get; set; }

        public string Category { get; set; }

        public string User { get; set; }

        public bool IsFreeShipping { get; set; }

        public string CreatedOn { get; set; }

        public int Likes { get; set; }

        public string Condition { get; set; }
    }
}
