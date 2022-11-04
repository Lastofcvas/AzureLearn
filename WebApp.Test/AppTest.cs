using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using Newtonsoft.Json;
using System.Net;
using System;
using System.Text;
using WebApp.Test.Models;

namespace WebApp.Test
{
    public class AppTest
    {
        private const string API_URL = "https://localhost:7272/graphql";
        private readonly HttpClient _httpClient;

        public AppTest()
        {
            var factory = new WebApplicationFactory<Program>();
            _httpClient = factory.CreateClient();
        }

        [Fact]
        public async void ShouldReturnHelloWorld()
        {
            const string query = @"
                query hello {
                    hello
                }";

            var requestContent = GetRequestContent(query);
            var response = await GetResponse<ParentJsonModel<HelloJsonModel>>(_httpClient, requestContent);

            const string expected = "Hello, world!";

            Assert.Equal(expected, response.Json.Data.Hello);
        }

        public static async Task<ResponseModel<T>> GetResponse<T>(HttpClient httpClient, StringContent content) where T : class
        {
            var response = await httpClient.PostAsync(API_URL, content);
            var json = await response.Content.ReadAsStringAsync();

            return new ResponseModel<T>
            {
                ResponseMessage = response,
                Json = JsonConvert.DeserializeObject<T>(json)
            };

        }

        public static StringContent GetRequestContent(string query, object? variables = null)
        {
            var payloadToParse = new { query, variables };

            string payload = JsonConvert.SerializeObject(payloadToParse);
            return new StringContent(payload, Encoding.UTF8, "application/json");
        }
    }
}