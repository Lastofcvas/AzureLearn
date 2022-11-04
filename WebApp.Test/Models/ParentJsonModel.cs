using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApp.Test.Models
{
    public class ParentJsonModel<T> where T : class, new()
    {
        public T Data { get; set; }
    }
}
