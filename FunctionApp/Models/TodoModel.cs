using Azure;
using Azure.Data.Tables;
using System;

namespace FunctionApp.Models
{
    public class TodoModel : ITableEntity
    {
        public string PartitionKey { get; set; }
        public string RowKey { get; set; }
        public DateTimeOffset? Timestamp { get; set; }
        public ETag ETag { get; set; }
        public string Description { set; get; }
        public bool IsComleted { set; get; }
    }
}
