using System;
using System.Collections.Generic;

namespace ShopBackend.Models
{
    public class KeyWord
    {
        public KeyWord()
        {
            this.ProductWords = new HashSet<ProductWord>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public ICollection<ProductWord> ProductWords { get; set; }
    }
}
