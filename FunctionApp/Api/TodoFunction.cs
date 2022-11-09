using Azure.Data.Tables;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FunctionApp.Interfaces;

namespace FunctionApp.Api
{
    public class TodoFunction
    {
        private readonly ITodoRepository todoRepository;

        public TodoFunction(ITodoRepository todoRepository)
        {
            this.todoRepository = todoRepository;
        }

        [FunctionName("todo")]
        public async Task<IActionResult> Add(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var todos = await todoRepository.GetAllAsync();

            var response = new
            {
                Todos = todos,
                IsRequestSuccessful = true
            };
            var json = JsonConvert.SerializeObject(response);

            return new OkObjectResult(json);
        }
    }
}
