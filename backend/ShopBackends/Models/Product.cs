using System;
using System.Collections.Generic;

namespace ShopBackend.Models
{
    public class Product
    {
        public Product()
        {
            this.ProductWords = new HashSet<ProductWord>();
            this.ReactedProducts = new HashSet<ReactedProduct>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public virtual ICollection<ProductWord> ProductWords { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public string Image { get; set; }

        public Category Category { get; set; }

        public User User { get; set; }

        public bool IsFreeShipping { get; set; }

        public DateTime CreatedOn { get; set; }

        public virtual ICollection<ReactedProduct> ReactedProducts { get; set; }

        public Condition Condition { get; set; }
    }
}
