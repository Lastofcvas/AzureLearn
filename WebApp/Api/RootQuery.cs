using GraphQL;
using WebApp.Repositories;

namespace WebApp.Api
{
    public class RootQuery
    {
        public static async Task<string> Hello([FromServices] HelloRepository helloRepository) => await helloRepository.GreetAsync();
    }
}
