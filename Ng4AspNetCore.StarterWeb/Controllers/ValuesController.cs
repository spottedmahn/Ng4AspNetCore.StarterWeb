using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Ng4AspNetCore.StarterWeb.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
			var result = new List<string>();
			var now = DateTime.Now;

			result.Add(now.Millisecond.ToString());
			result.Add(now.Second.ToString());
			result.Add(now.Minute.ToString());
			result.Add(now.Hour.ToString());
			result.Add(now.Day.ToString());
			result.Add(now.Month.ToString());
			result.Add(now.Year.ToString());
			result.Add(Request.Headers.ContainsKey("Authorization") ? "authenticated" : "unauthenticated");

			return result.ToArray();
        }
    }
}
