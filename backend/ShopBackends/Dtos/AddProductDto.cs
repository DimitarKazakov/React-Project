using System;
using System.Collections.Generic;

namespace ShopBackend.Dtos
{
    public class AddProductDto
    {
        public AddProductDto()
        {
        }

        public string UserEmail { get; set; }

        public string Category { get; set; }

        public string Description { get; set; }

        public string Name { get; set; }

        public bool IsFreeShipping { get; set; }

        public string Image { get; set; }

        public string Price { get; set; }

        public string Condition { get; set; }

        public IEnumerable<string> KeyWords { get; set; }
    }
}
