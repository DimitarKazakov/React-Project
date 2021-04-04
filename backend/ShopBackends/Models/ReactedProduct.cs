using System;
namespace ShopBackend.Models
{
    public class ReactedProduct
    {
        public ReactedProduct()
        {
        }

        public int Id { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public bool Wishlisted { get; set; }

        public bool Liked { get; set; }
    }
}
