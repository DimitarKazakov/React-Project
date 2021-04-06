using System;
namespace ShopBackend.Dtos
{
    public class MessageDto
    {
        public MessageDto()
        {
        }

        public string From { get; set; }

        public string To { get; set; }

        public string Subject { get; set; }

        public string Content { get; set; }

        public string ContactLink { get; set; }
    }
}
