using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Threading.Tasks;
using FunctionApp.Interfaces;
using FunctionApp.Models;
using FunctionApp.Helpers;

namespace FunctionApp.Api
{
    public class TodoFunction
    {
        private readonly ITodoRepository todoRepository;

        public TodoFunction(ITodoRepository todoRepository)
        {
            this.todoRepository = todoRepository;
        }

        [FunctionName("getall")]
        public async Task<IActionResult> GetAll(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "todo/getall")] HttpRequest request,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var todos = await todoRepository.GetAllAsync();

            var response = new { Todos = todos };
            var responseJson = JsonConvert.SerializeObject(response);

            return new OkObjectResult(responseJson);
        }

        [FunctionName("get")]
        public async Task<IActionResult> GetById([HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "todo/get")] HttpRequest request)
        {
            string id = request.Query["id"];
            var todo = await todoRepository.GetByIdAsync(id);

            var response = new { Todo = todo };
            var responseJson = JsonConvert.SerializeObject(response);

            return new OkObjectResult(responseJson);
        }

        [FunctionName("solve")]
        public async Task<IActionResult> Solve([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/solve")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<RowKeyPayloadModel>(request.Body);
            var id = await todoRepository.SolveAsync(payload.RowKey);

            var response = new { Id = id };
            var responseJson = JsonConvert.SerializeObject(response);

            return new OkObjectResult(responseJson);
        }

        [FunctionName("add")]
        public async Task<IActionResult> Add([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/add")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<TodoModel>(request.Body);
            var id = await todoRepository.AddAsync(payload);
            var addedTodo = await todoRepository.GetByIdAsync(id);

            var response = new { Todo = addedTodo };
            var responseJson = JsonConvert.SerializeObject(response);

            return new OkObjectResult(responseJson);
        }

        [FunctionName("update")]
        public async Task<IActionResult> Update([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/update")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<TodoModel>(request.Body);
            var id = await todoRepository.UpdateAsync(payload);
            var updateTodo = await todoRepository.GetByIdAsync(id);

            var response = new { Todo = updateTodo };
            var responseJson = JsonConvert.SerializeObject(response);

            return new OkObjectResult(responseJson);
        }

        [FunctionName("delete")]
        public async Task<IActionResult> Delete([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/delete")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<RowKeyPayloadModel>(request.Body);
            var id = await todoRepository.DeleteAsync(payload.RowKey);

            var response = new { Id = id };
            var responseJson = JsonConvert.SerializeObject(response);

            return new OkObjectResult(responseJson);
        }
    }
}
