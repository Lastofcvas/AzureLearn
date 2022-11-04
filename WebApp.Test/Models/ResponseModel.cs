using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Test.Models
{
    public class ResponseModel<T> where T : class
    {
        public HttpResponseMessage ResponseMessage { get; set; }
        public T Json { set; get; }
    }
}
