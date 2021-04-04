using System;
namespace ShopBackend.Models
{
    public class ProductWord
    {
        public ProductWord()
        {
        }

        public int Id { get; set; }

        public int KeyWordId { get; set; }

        public KeyWord KeyWord { get; set; }

        public int ProductId { get; set; }

        public Product Product { get; set; }
    }
}
