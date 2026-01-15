using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

namespace Pathfinder.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ChatController : ControllerBase
    {
        private readonly Kernel _kernel;
        private readonly IChatCompletionService _chatCompletionService;

        public ChatController(Kernel kernel)
        {
            _kernel = kernel;
            _chatCompletionService = kernel.GetRequiredService<IChatCompletionService>();
        }

        [HttpPost("teaser")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTeaserResponse([FromBody] TeaserRequest request)
        {
            if (string.IsNullOrEmpty(request.Message))
                return BadRequest("Message cannot be empty.");

            var history = new ChatHistory();
            history.AddSystemMessage("You are the Pathfinder Teaser. Provide a one-sentence high-impact career synthesis based on the user's brief input. Be bold and futuristic.");
            history.AddUserMessage(request.Message);

            try
            {
                var result = await _chatCompletionService.GetChatMessageContentAsync(history, kernel: _kernel);
                return Ok(new { Response = result.Content });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Teaser Error: {ex.Message}");
            }
        }

        [HttpPost("oracle")]
        [Authorize]
        public async Task<IActionResult> GetOracleResponse([FromBody] ChatRequest request)
        {
            if (string.IsNullOrEmpty(request.Message))
                return BadRequest("Message cannot be empty.");

            var history = new ChatHistory();
            var prompt =
@"You are the Pathfinder Oracle, a high-intelligence AI career strategist. 
Your goal is to act as a Deep Interest Diagnostician, NOT a standard assistant.
Do NOT simply answer questions or provide lists of jobs immediately.
Instead, you must RECURSIVELY QUESTION the user to uncover hidden aptitudes.

PROTOCOL:
1. FIRST RESPONSE: Welcome the user and ask a psychometric diagnostics question (e.g., 'Do you prefer solving problems with physical tools or abstract logic?').
2. DIAGNOSIS PHASE (Turns 1-5):
   - Ask ONE probing question at a time.
   - Do NOT ask about degrees or university credentials.
   - Focus on: Spatial Reasoning, Environmental Preferences (Field vs Office), and Logic Patterns (Visual vs Structural).
   - If the user gives a short answer, dig deeper.
3. SYNTHESIS PHASE (After sufficient data):
   - Propose a 'Career Hypothesis' linking their traits to a modern industry (e.g., 'Your logical structure + love for outdoors suggests Smart Grid Architecture').

TONE:
- Concise, Industrial, Professional, and Highly Logical.
- Avoid corporate fluff. Be direct.";

            history.AddSystemMessage(prompt);

            foreach (var msg in request.History ?? new List<ChatMessage>())
            {
                if (msg.IsUser) history.AddUserMessage(msg.Content);
                else history.AddAssistantMessage(msg.Content);
            }

            history.AddUserMessage(request.Message);

            try
            {
                var result = await _chatCompletionService.GetChatMessageContentAsync(history, kernel: _kernel);
                return Ok(new { Response = result.Content });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[AI ENGINE ERROR] {ex}");
                // Log if the chat service is actually available
                var service = _kernel.GetRequiredService<IChatCompletionService>();
                Console.WriteLine($"[DIAGNOSTIC] IChatCompletionService Type: {service.GetType().Name}");
                return StatusCode(500, $"AI Engine Error: {ex.Message}");
            }
        }
    }

    public class ChatRequest
    {
        public string Message { get; set; } = string.Empty;
        public List<ChatMessage>? History { get; set; }
    }

    public class TeaserRequest
    {
        public string Message { get; set; } = string.Empty;
    }

    public class ChatMessage
    {
        public bool IsUser { get; set; }
        public string Content { get; set; } = string.Empty;
    }
}
