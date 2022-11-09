using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Azure.Data.Tables;
using WebApp.Models;

namespace FunctionApp.Api
{
    public static class FunctionExample
    {
        [FunctionName("HttpExample")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var connectionString = Environment.GetEnvironmentVariable("AzureStorage", EnvironmentVariableTarget.Process);
            var tableServiceClient = new TableServiceClient(connectionString);
            var tableClient = tableServiceClient.GetTableClient("Hello");

            var result = await tableClient.GetEntityAsync<HelloModel>(
                rowKey: "Serhii",
                partitionKey: "Hnatiuk"
            );

            var response = new
            {
                hello = result.Value.Hello
            };
            var json = JsonConvert.SerializeObject(response);

            return new OkObjectResult(json);
        }
    }
}
