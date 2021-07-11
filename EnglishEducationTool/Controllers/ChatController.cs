using EnglishEducationTool.Data.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
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
        public async Task<ActionResult<string>> Post([FromBody] string chatVal)
        {
            // TODO:  OpenAI chat response implementation

            return "send response: should have OpenAI input here";
        }

        //TODO: !!!!! wont receive string from front end to back end
        // POST api/<ChatController>
        [HttpPost]
        [Route("sendSpell")]
        public async Task<ActionResult<FlaggedToken[]>> PostSpell([FromBody] string chatVal)
        {
            FlaggedToken[] userProof = Array.Empty<FlaggedToken>();
            // microsoft SpellCheck API
            try
            {
                userProof = await Proofing(chatVal);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            };

            //// todo:D mock method to not overuse 3rd party server
            //userProof = await MockProofing(chatVal.UserResponse);

            return userProof;
        }

        #region SpellCheck API

        //// Add your Azure subscription key to your environment variables.
        //static string key = Environment.GetEnvironmentVariable("BING_AUTOSUGGEST_SUBSCRIPTION_KEY");
        //// Add your Azure Bing Autosuggest endpoint to your environment variables.
        //static string endpoint = Environment.GetEnvironmentVariable("BING_AUTOSUGGEST_ENDPOINT");

        //TODO: add secure environment variable for key
        static string subscriptionKey = "934735cb1077416da4d4f3dce8a0d570";
        static string endpoint = "https://api.bing.microsoft.com/";

        static string path = "/v7.0/spellcheck?";

        // For a list of available markets, go to:
        // https://docs.microsoft.com/rest/api/cognitiveservices/bing-autosuggest-api-v7-reference#market-codes
        static string market = "en-US";

        static string mode = "proof";

        // These properties are used for optional headers (see below).
        // static string ClientId = "<Client ID from Previous Response Goes Here>";
        // static string ClientIp = "999.999.999.999";
        // static string ClientLocation = "+90.0000000000000;long: 00.0000000000000;re:100.000000000000";

        async Task<FlaggedToken[]> Proofing(string userChatInput)
        {
            HttpClient client = new HttpClient();
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", subscriptionKey);

            // The following headers are optional, but it is recommended they be treated as required.
            // These headers help the service return more accurate results.
            // client.DefaultRequestHeaders.Add("X-Search-Location", ClientLocation);
            // client.DefaultRequestHeaders.Add("X-MSEdge-ClientID", ClientId);
            // client.DefaultRequestHeaders.Add("X-MSEdge-ClientIP", ClientIp);

            HttpResponseMessage response = new HttpResponseMessage();
            string uri = endpoint + path;

            List<KeyValuePair<string, string>> values = new List<KeyValuePair<string, string>>();
            values.Add(new KeyValuePair<string, string>("mkt", market));
            values.Add(new KeyValuePair<string, string>("mode", mode));
            values.Add(new KeyValuePair<string, string>("text", userChatInput));

            using (FormUrlEncodedContent content = new FormUrlEncodedContent(values))
            {
                content.Headers.ContentType = new MediaTypeHeaderValue("application/x-www-form-urlencoded");
                response = await client.PostAsync(uri, content);
            }

            // Get the client ID header from your request (optional)
            // string client_id;
            // if (response.Headers.TryGetValues("X-MSEdge-ClientID", out IEnumerable<string> header_values))
            // {
            //     client_id = header_values.First();
            //     Console.WriteLine("Client ID: " + client_id);
            // }

            string contentString = await response.Content.ReadAsStringAsync();

            //mock json data for contentString:
            // "Hollo, wrld!"
            // "{\"_type\": \"SpellCheck\", \"flaggedTokens\": [{\"offset\": 0, \"token\": \"Hollo\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"Hello\", \"score\": 0.9124109442175475}, {\"suggestion\": \"Hollow\", \"score\": 0.7889023543711866}]}, {\"offset\": 7, \"token\": \"wrld\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"world\", \"score\": 0.9124109442175475}]}]}"
            //
            // "There going to bring they’re suitcases."
            // "{\"_type\": \"SpellCheck\", \"flaggedTokens\": [{\"offset\": 21, \"token\": \"they’re\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"their\", \"score\": 0.8961550966590242}]}]}"
            //Deserialize the JSON response from the API
            SpellCheck jsonObj = JsonConvert.DeserializeObject<SpellCheck>(contentString);
            return jsonObj.FlaggedTokens;
        }

        #endregion

        async Task<FlaggedToken[]> MockProofing(string userChatInput)
        {
            //  "Hollo, wrld! I am eaten a apple"
            string contentString = "{\"_type\": \"SpellCheck\", \"flaggedTokens\": [{\"offset\": 0, \"token\": \"Hollo\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"Hello\", \"score\": 0.8502965392240266}, {\"suggestion\": \"Hollow\", \"score\": 0.6217967251270513}]}, {\"offset\": 7, \"token\": \"wrld\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"world\", \"score\": 0.8502965392240266}]}, {\"offset\": 18, \"token\": \"eaten\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"eating\", \"score\": 0.8502965392240266}]}]}";
            //mock json data for contentString:
            // "Hollo, wrld!"
            // "{\"_type\": \"SpellCheck\", \"flaggedTokens\": [{\"offset\": 0, \"token\": \"Hollo\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"Hello\", \"score\": 0.9124109442175475}, {\"suggestion\": \"Hollow\", \"score\": 0.7889023543711866}]}, {\"offset\": 7, \"token\": \"wrld\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"world\", \"score\": 0.9124109442175475}]}]}"
            //
            // "There going to bring they’re suitcases."
            // "{\"_type\": \"SpellCheck\", \"flaggedTokens\": [{\"offset\": 21, \"token\": \"they’re\", \"type\": \"UnknownToken\", \"suggestions\": [{\"suggestion\": \"their\", \"score\": 0.8961550966590242}]}]}"
            //Deserialize the JSON response from the API
            SpellCheck jsonObj = JsonConvert.DeserializeObject<SpellCheck>(contentString);
            FlaggedToken[] flaggedToken = jsonObj.FlaggedTokens;
            return flaggedToken;
        }


    }
}
