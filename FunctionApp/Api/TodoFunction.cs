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
using System.Net.Http;
using System.Text;
using System.Net;
using Newtonsoft.Json.Serialization;
using System.Collections.Generic;

namespace FunctionApp.Api
{
    public class TodoFunction
    {
        private readonly ITodoRepository todoRepository;
        private readonly DataTypeHelper dataTypeHelper;

        public TodoFunction(ITodoRepository todoRepository, DataTypeHelper dataTypeHelper)
        {
            this.todoRepository = todoRepository;
            this.dataTypeHelper = dataTypeHelper;
        }

        [FunctionName("getall")]
        public async Task<HttpResponseMessage> GetAll(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "todo/getall")] HttpRequest request,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            var todos = await todoRepository.GetAllAsync();
            var responseTodos = dataTypeHelper.ConvertTodoModelListToResponseTodoModel(todos);

            var response = new { todos = responseTodos };
            return GetResponseMessage(response);
        }

        [FunctionName("solve")]
        public async Task<HttpResponseMessage> Solve([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/solve")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<string>(request.Body);
            var id = await todoRepository.SolveAsync(payload);

            var response = new { id = id };
            return GetResponseMessage(response);
        }

        [FunctionName("add")]
        public async Task<HttpResponseMessage> Add([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/add")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<AddTodoModel>(request.Body);
            var id = await todoRepository.AddAsync(new TodoModel()
            {
                Description = payload.Description,
                IsCompleted = payload.IsCompleted
            });
            var addedTodo = await todoRepository.GetByIdAsync(id);
            var responseTodo = dataTypeHelper.ConvertTodoModelListToResponseTodoModel(new List<TodoModel>() { addedTodo });

            var response = new { todo = responseTodo[0] };
            return GetResponseMessage(response);
        }

        [FunctionName("update")]
        public async Task<HttpResponseMessage> Update([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/update")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<UpdateTodoModel>(request.Body);
            var currentTodo = await todoRepository.GetByIdAsync(payload.Id);
            var id = await todoRepository.UpdateAsync(new TodoModel()
            {
                RowKey = currentTodo.RowKey,
                PartitionKey = currentTodo.PartitionKey,
                ETag = currentTodo.ETag,
                Timestamp = currentTodo.Timestamp,
                Description = payload.Description,
                IsCompleted = payload.IsCompleted
            });
            var updateTodo = await todoRepository.GetByIdAsync(id);
            var responseTodo = dataTypeHelper.ConvertTodoModelListToResponseTodoModel(new List<TodoModel>() { updateTodo });

            var response = new { todo = responseTodo[0] };
            return GetResponseMessage(response);
        }

        [FunctionName("delete")]
        public async Task<HttpResponseMessage> Delete([HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "todo/delete")] HttpRequest request)
        {
            var payload = await HttpHelper.GetPayloadFromRequestBody<string>(request.Body);
            var id = await todoRepository.DeleteAsync(payload);

            var response = new { id = id };
            return GetResponseMessage(response);
        }

        private HttpResponseMessage GetResponseMessage(object response)
        {
            var responseJson = JsonConvert.SerializeObject(response, new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver() 
            });

            return new HttpResponseMessage(HttpStatusCode.OK)
            {
                Content = new StringContent(responseJson, Encoding.UTF8, "application/json")
            };
        }
    }
}
