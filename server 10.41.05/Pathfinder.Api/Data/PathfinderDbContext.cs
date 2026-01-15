using Microsoft.EntityFrameworkCore;
using Pathfinder.Api.Models;

namespace Pathfinder.Api.Data
{
    public class PathfinderDbContext : DbContext
    {
        public PathfinderDbContext(DbContextOptions<PathfinderDbContext> options)
            : base(options)
        {
        }

        public DbSet<Skill> Skills { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresExtension("vector");

            modelBuilder.Entity<Skill>(entity =>
            {
                entity.HasIndex(e => e.Embedding)
                    .HasMethod("hnsw")
                    .HasOperators("vector_l2_ops");
            });
        }
    }
}
