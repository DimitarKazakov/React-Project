using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ShopBackend.Models;
namespace ShopBackend
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; }
        public DbSet<KeyWord> KeyWords { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductWord> ProductWords { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<ReactedProduct> ReactedProducts { get; set; }
        public DbSet<Condition> Conditions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

        internal Task firstOrDefaultAsync()
        {
            throw new NotImplementedException();
        }
    }
}
