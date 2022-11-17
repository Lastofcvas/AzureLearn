using FunctionApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FunctionApp.Helpers
{
    public class DataTypeHelper
    {
        public List<ResponseTodoModel> ConvertTodoModelListToResponseTodoModel(List<TodoModel> todoModels)
        {
            var result = new List<ResponseTodoModel>();

            foreach (var todo in todoModels)
            {
                result.Add(new()
                {
                    Id = todo.RowKey,
                    Description = todo.Description,
                    IsCompleted = todo.IsCompleted
                });
            }

            return result;
        }
    }
}
