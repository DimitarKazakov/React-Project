using System;
using System.Collections.Generic;

namespace ShopBackend.Models
{
    public class User
    {
        public User()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Messages = new HashSet<Message>();
            this.Products = new HashSet<Product>();
            this.ReactedProducts = new HashSet<ReactedProduct>();
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

        public DateTime CreatedOn { get; set; }

        public ICollection<Message> Messages { get; set; }

        public ICollection<Product> Products { get; set; }

        public ICollection<ReactedProduct> ReactedProducts { get; set; }
    }
}
