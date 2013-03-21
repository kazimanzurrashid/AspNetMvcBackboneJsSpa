namespace BackboneTemplate.Models
{
    using System.Data.Entity;

    public class UsersContext : DbContext
    {
        public UsersContext() : base("DefaultConnection")
        {
        }

        public DbSet<User> Users { get; set; } 
    }
}