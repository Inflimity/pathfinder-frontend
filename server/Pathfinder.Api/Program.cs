using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;
using Microsoft.SemanticKernel.Connectors.Google;
using Microsoft.IdentityModel.Logging;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Show detailed PII for debugging
IdentityModelEventSource.ShowPII = true;

// Add services to the container.
builder.Services.AddControllers();

// CORS for Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Supabase JWT Authentication (Explicit Metadata)
var supabaseUrl = "https://vrecepzwgcmbsvqdxbit.supabase.co";

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = $"{supabaseUrl}/auth/v1";
        options.MetadataAddress = $"{supabaseUrl}/auth/v1/.well-known/openid-configuration";

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = $"{supabaseUrl}/auth/v1",
            ValidateAudience = true,
            ValidAudience = "authenticated",
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromMinutes(5)
        };
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (context.Exception != null)
                {
                    Console.WriteLine($"[AUTH ERROR] {context.Exception.Message}");
                }
                return Task.CompletedTask;
            },
            OnTokenValidated = context =>
            {
                Console.WriteLine("[AUTH SUCCESS] Token validated.");
                return Task.CompletedTask;
            }
        };
    });

// EF Core with Npgsql and pgvector
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
if (!string.IsNullOrEmpty(connectionString))
{
    builder.Services.AddDbContext<Pathfinder.Api.Data.PathfinderDbContext>(options =>
        options.UseNpgsql(connectionString, x => x.UseVector()));
}

// Semantic Kernel with Gemini
var geminiApiKey = builder.Configuration["Gemini:ApiKey"]?.Trim();
if (!string.IsNullOrEmpty(geminiApiKey))
{
    // Masked log for debugging
    var maskedKey = geminiApiKey.Length > 8 ? $"{geminiApiKey[..4]}...{geminiApiKey[^4..]}" : "****";
    Console.WriteLine($"[GEMINI CONFIG] Key present: {maskedKey}");

    // gemini-2.0-flash is the current standard as of late 2025
    const string modelId = "gemini-2.0-flash";

    builder.Services.AddScoped<IChatCompletionService>(sp =>
    {
        return new GoogleAIGeminiChatCompletionService(modelId, geminiApiKey);
    });

    builder.Services.AddScoped(sp =>
    {
        return Kernel.CreateBuilder()
            .AddGoogleAIGeminiChatCompletion(modelId, geminiApiKey)
            .Build();
    });
}
else
{
    Console.WriteLine("[CRITICAL] Gemini:ApiKey is missing or empty in configuration!");
}

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
