using FunctionApp.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FunctionApp.Helpers
{
    public static class HttpHelper
    {
        public static async Task<T> GetPayloadFromRequestBody<T>(Stream body) where T : class
        {
            string requestBody = string.Empty;

            using (var streamReader = new StreamReader(body))
            {
                requestBody = await streamReader.ReadToEndAsync();
            }

            return JsonConvert.DeserializeObject<T>(requestBody);
        }
    }
}
