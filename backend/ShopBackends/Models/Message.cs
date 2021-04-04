using System;
namespace ShopBackend.Models
{
    public class Message
    {
        public Message()
        {
        }

        public int Id { get; set; }

        public string Content { get; set; }

        public string UserId { get; set; }

        public User User { get; set; }

        public string ContactLink { get; set; }

    }
}
