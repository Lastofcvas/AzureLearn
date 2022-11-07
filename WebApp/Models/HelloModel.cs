using Azure;
using Azure.Data.Tables;

namespace WebApp.Models
{
    public class HelloModel : ITableEntity
    {
        public string RowKey { get; set; } = default!;

        public string PartitionKey { get; set; } = default!;

        public string Hello { get; set; } = default!;
        public DateTimeOffset? Timestamp { get; set; } = default!;
        public ETag ETag { get; set; } = default!;
    }
}
