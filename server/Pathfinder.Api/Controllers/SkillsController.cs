using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Embeddings;
using Pathfinder.Api.Data;
using Pathfinder.Api.Models;
using Pgvector;
using Pgvector.EntityFrameworkCore;

namespace Pathfinder.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SkillsController : ControllerBase
    {
        private readonly PathfinderDbContext _context;
        // private readonly ITextEmbeddingGenerationService _embeddingService;

        public SkillsController(PathfinderDbContext context, Kernel kernel)
        {
            _context = context;
            // _embeddingService = kernel.GetRequiredService<ITextEmbeddingGenerationService>();
        }

        [HttpPost("search")]
        public async Task<IActionResult> SearchSkills([FromBody] SearchRequest request)
        {
            if (string.IsNullOrEmpty(request.Query))
                return BadRequest("Query cannot be empty.");

            try
            {
                // Generate embedding for the query
                // var queryEmbedding = await _embeddingService.GenerateEmbeddingAsync(request.Query);
                var vector = new Vector(new float[1536]); // Placeholder zero vector

                // Perform vector similarity search using pgvector
                var similarSkills = await _context.Skills
                    .OrderBy(s => s.Embedding!.L2Distance(vector))
                    .Take(request.Limit ?? 5)
                    .Select(s => new SkillDto
                    {
                        Name = s.Name,
                        Sector = s.Sector,
                        Description = s.Description,
                        Distance = s.Embedding!.L2Distance(vector)
                    })
                    .ToListAsync();

                return Ok(similarSkills);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Search Error: {ex.Message}");
            }
        }

        [HttpPost("seed")]
        [AllowAnonymous] // For prototype purposes
        public async Task<IActionResult> SeedSkills([FromBody] List<SkillSeedRequest> skills)
        {
            foreach (var s in skills)
            {
                // var embedding = await _embeddingService.GenerateEmbeddingAsync(s.Description);
                _context.Skills.Add(new Skill
                {
                    Id = Guid.NewGuid(),
                    Name = s.Name,
                    Sector = s.Sector,
                    Description = s.Description,
                    Embedding = new Vector(new float[1536]) // Placeholder
                });
            }

            await _context.SaveChangesAsync();
            return Ok("Skills seeded successfully.");
        }
    }

    public class SearchRequest
    {
        public string Query { get; set; } = string.Empty;
        public int? Limit { get; set; }
    }

    public class SkillSeedRequest
    {
        public string Name { get; set; } = string.Empty;
        public string Sector { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class SkillDto
    {
        public string Name { get; set; } = string.Empty;
        public string Sector { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public double Distance { get; set; }
    }
}
