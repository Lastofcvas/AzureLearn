using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FunctionApp.Models
{
    public class ResponseTodoModel
    {
        public string Id { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { set; get; }
    }
}
