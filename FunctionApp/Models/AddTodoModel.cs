using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FunctionApp.Models
{
    public class AddTodoModel
    {
        public string Description { get; set; }
        public bool IsCompleted { get; set; }
    }
}
