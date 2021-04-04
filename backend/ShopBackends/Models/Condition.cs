using System;
using System.Collections.Generic;

namespace ShopBackend.Models
{
    public class Condition
    {
        public Condition()
        {
            this.Products = new HashSet<Product>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
