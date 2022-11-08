using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using WebApp.Repositories;
using System.ComponentModel.DataAnnotations.Schema;
using GraphQL.Types.Relay.DataObjects;
using Microsoft.WindowsAzure.Storage.Table;
using Azure.Data.Tables;
using WebApp.Models;
using Microsoft.WindowsAzure.Storage;
using System.Configuration;

namespace FunctionApp
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
            var value = result.Value.Hello;
            
            var response = new
            {
                hello = value
            };
            var json = JsonConvert.SerializeObject(response);

            return new OkObjectResult(json);
        }
    }
}
