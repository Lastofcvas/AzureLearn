using FunctionApp.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FunctionApp.Interfaces
{
    public interface ITodoRepository
    {
        Task<List<TodoModel>> GetAllAsync();
        Task<TodoModel> GetByIdAsync(string id);
        Task<string> SolveAsync(string id);
        Task<string> AddAsync(TodoModel model);
        Task<string> UpdateAsync(TodoModel model);
        Task<string> DeleteAsync(string id);

    }
}
