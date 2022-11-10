using Azure;
using Azure.Data.Tables;
using FunctionApp.Interfaces;
using FunctionApp.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FunctionApp.Repositories
{
    public class AzureTodoRepository : ITodoRepository
    {
        private readonly TableClient tableClient;
        private const string PK = "Todos";

        public AzureTodoRepository()
        {
            var connectionString = Environment.GetEnvironmentVariable("AzureStorage", EnvironmentVariableTarget.Process);
            var tableServiceClient = new TableServiceClient(connectionString);
            tableClient = tableServiceClient.GetTableClient("Todos");
        }

        public async Task<List<TodoModel>> GetAllAsync()
        {
            var result = new List<TodoModel>();
            var queryResultsMaxPerPage = tableClient.QueryAsync<TodoModel>();

            await foreach (Page<TodoModel> page in queryResultsMaxPerPage.AsPages())
            {
                result.AddRange(page.Values);
            }

            return result.OrderBy(t => t.IsCompleted).ToList();
        }

        public async Task<TodoModel> GetByIdAsync(string id)
        {
            return await tableClient.GetEntityAsync<TodoModel>(partitionKey: PK, rowKey: id);
        }

        public async Task<string> SolveAsync(string id)
        {
            var todo = await tableClient.GetEntityAsync<TodoModel>(partitionKey: PK, rowKey: id);
            todo.Value.IsCompleted = true;
            await tableClient.UpdateEntityAsync<TodoModel>(todo, ETag.All);

            return id;
        }

        public async Task<string> AddAsync(TodoModel model)
        {
            model.PartitionKey = PK;
            model.RowKey = Guid.NewGuid().ToString();
            await tableClient.AddEntityAsync(model);
            
            return model.RowKey;
        }

        public async Task<string> UpdateAsync(TodoModel model)
        {
            await tableClient.UpdateEntityAsync(model, ETag.All);
            return model.RowKey;
        }

        public async Task<string> DeleteAsync(string id)
        {
            await tableClient.DeleteEntityAsync(partitionKey: PK, rowKey: id);
            return id;
        }
    }
}
