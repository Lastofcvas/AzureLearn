using Azure.Data.Tables;
using WebApp.Models;

namespace WebApp.Repositories
{
    public class HelloRepository
    {
        private readonly TableClient _tableClient;

        public HelloRepository(IConfiguration configuration)
        {
            var tableServiceClient = new TableServiceClient(configuration.GetConnectionString("AzureStorage"));
            _tableClient = tableServiceClient.GetTableClient("Hello");
        }

        public async Task<string> GreetAsync()
        {
            var result = await _tableClient.GetEntityAsync<HelloModel>(
                rowKey: "Serhii",
                partitionKey: "Hnatiuk"
            );

            return result.Value.Hello!;
        }
    }
}
