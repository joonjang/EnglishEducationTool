using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EnglishEducationTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        // GET: api/<ChatController>
        [HttpGet]
        public IEnumerable<string> Get()
        {

            return new string[] { "value1", "value2" };
        }

        // POST api/<ChatController>
        [HttpPost]
        [Route("send")]
        public async Task<ActionResult<ChatDto>> Post([FromBody] ChatDto chatVal)
        {
            // todo:  grammar + spelling proofreading

            return new ChatDto {
                UserResponse = chatVal.UserResponse,
                AIResponse = "HELLO WORLD" };
        }



    }
}
