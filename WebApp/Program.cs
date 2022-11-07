using GraphQL;
using WebApp.Api;
using WebApp.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

const string POLICY = "CorsSpecificOrigins";

builder.Services.AddCors(o => o.AddPolicy(POLICY, builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
}));

builder.Services.AddControllers();

builder.Services.AddSingleton<HelloRepository>();

builder.Services.AddGraphQL(b => b
        .AddAutoSchema<RootQuery>()
        .AddSystemTextJson()
        .AddErrorInfoProvider(e => e.ExposeExceptionDetails = true));

var app = builder.Build();

// Configure the HTTP request pipeline.

app.UseHttpsRedirection();
app.UseRouting();
app.UseCors(POLICY);
app.UseAuthorization();
app.UseGraphQLAltair("/");

app.UseEndpoints(endpoints =>
{
    endpoints.MapGraphQL("/graphql");
});

app.Run();

public partial class Program { }