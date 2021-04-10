using System;
namespace ShopBackend.Dtos
{
    public class UpdateUserDto
    {
        public UpdateUserDto()
        {
        }

        public string Image { get; set; }

        public string Name { get; set; }

        public string Address { get; set; }

        public string Town { get; set; }

        public string Phone { get; set; }
    }
}
