using Azure;
using Azure.Data.Tables;
using FunctionApp.Interfaces;
using FunctionApp.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FunctionApp.Repositories
{
    public class AzureTodoRepository : ITodoRepository
    {
        private readonly TableClient tableClient;

        public AzureTodoRepository()
        {
            var connectionString = Environment.GetEnvironmentVariable("AzureStorage", EnvironmentVariableTarget.Process);
            var tableServiceClient = new TableServiceClient(connectionString);
            tableClient = tableServiceClient.GetTableClient("Todos");
        }

        public void Add(TodoModel model)
        {
            throw new NotImplementedException();
        }

        public async Task<List<TodoModel>> GetAllAsync()
        {
            var result = new List<TodoModel>();
            var queryResultsMaxPerPage = tableClient.QueryAsync<TodoModel>();

            await foreach (Page<TodoModel> page in queryResultsMaxPerPage.AsPages())
            {
                result.AddRange(page.Values);
            }

            return result;
        }

        public void Update(TodoModel model)
        {
            throw new NotImplementedException();
        }
    }
}
