using GraphQL;
using WebApp.Repositories;

namespace WebApp.Api
{
    public class RootQuery
    {
        [Name("hello")]
        public static async Task<string> GreetAsync([FromServices] HelloRepository helloRepository) => await helloRepository.GreetAsync();
    }
}
