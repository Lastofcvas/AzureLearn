using FunctionApp.Helpers;
using FunctionApp.Interfaces;
using FunctionApp.Repositories;
using Microsoft.Azure.Functions.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection;

[assembly: FunctionsStartup(typeof(FunctionApp.Startup))]
namespace FunctionApp
{
    public class Startup : FunctionsStartup
    {
        public override void Configure(IFunctionsHostBuilder builder)
        {
            builder.Services.AddSingleton<DataTypeHelper>();
            builder.Services.AddSingleton<ITodoRepository, AzureTodoRepository>();
        }
    }
}
