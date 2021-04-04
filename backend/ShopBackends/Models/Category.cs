using System;
using System.Collections.Generic;

namespace ShopBackend.Models
{
    public class Category
    {
        public Category()
        {
            this.Products = new HashSet<Product>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public string Image { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
