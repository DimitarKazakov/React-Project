using System;
using System.Collections;
using System.Collections.Generic;
using ShopBackend.Models;

namespace ShopBackend.Dtos
{
    public class UserProfileDto
    {
        public UserProfileDto()
        {
            this.ProductArr = new HashSet<Product>();
        }

        public string Id { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string Photo { get; set; }

        public string RealName { get; set; }

        public string Phone { get; set; }

        public string Address { get; set; }

        public string Town { get; set; }

        public string CreatedOn { get; set; }

        public int Products { get; set; }

        public int Likes { get; set; }

        public IEnumerable<Product> ProductArr { get; set; }
    }
}
