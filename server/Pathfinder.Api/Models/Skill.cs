using Pgvector;
using System.ComponentModel.DataAnnotations;

namespace Pathfinder.Api.Models
{
    public class Skill
    {
        [Key]
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Sector { get; set; } = string.Empty;
        public Vector? Embedding { get; set; }
        public string Description { get; set; } = string.Empty;
    }
}
