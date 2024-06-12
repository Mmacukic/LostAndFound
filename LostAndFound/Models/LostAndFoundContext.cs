using Microsoft.EntityFrameworkCore;

namespace LostAndFound.Models;

public class LostAndFoundContext : DbContext
{
    public DbSet<UserModel> Users { get; set; }
    public DbSet<Listing> Listings { get; set; }
    
    public DbSet<Message> Messages { get; set; }
    

    public LostAndFoundContext(DbContextOptions options) : base(options)
    {
        
    }
    
}