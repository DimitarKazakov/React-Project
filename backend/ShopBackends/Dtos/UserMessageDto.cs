using System;
namespace ShopBackend.Dtos
{
    public class UserMessageDto
    {
        public UserMessageDto()
        {
        }

        public int Id { get; set; }

        public string Content { get; set; }

        public string To { get; set; }

        public string ContactLink { get; set; }

        public string Subject { get; set; }

        public string From { get; set; }

        public string CreatedOn { get; set; }
    }
}
