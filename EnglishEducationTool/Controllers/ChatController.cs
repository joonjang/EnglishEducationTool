using EnglishEducationTool.Data.Models;
using EnglishEducationTool.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.CognitiveServices.ContentModerator;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EnglishEducationTool.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ChatController : ControllerBase
    {
        public AppKeyConfig AppConfigs { get; }
        public ChatController(IOptions<AppKeyConfig> appKeys)
        {
            AppConfigs = appKeys.Value;
        }

        // GET: api/<ChatController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // POST api/<ChatController>
        [HttpPost]
        [Route("postSpell")]
        public async Task<ActionResult<FlaggedToken[]>> PostSpell([FromBody] ChatDto chatVal)
        {
            if (ModerateText(chatVal.UserResponse))
            {
                return null;
            }

            // TODO:  OpenAI chat response implementation

            FlaggedToken[] userProof = Array.Empty<FlaggedToken>();

            // microsoft SpellCheck API
            try
            {
                userProof = await Proofing(chatVal.UserResponse);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
            };

            //// todo:D mock method to not overuse 3rd party server
            //userProof = await MockProofing(chatVal.UserResponse);

            return userProof;
        }

        // POST api/<ChatController>
        [HttpPost]
        [Route("postBot")]
        public async Task<ActionResult<string>> PostBot([FromBody] ChatDto chatVal)
        {
            if (ModerateText(chatVal.UserResponse))
            {
                return JsonConvert.SerializeObject("CONTENT BLOCKED"); ;
            }

            // TODO:  OpenAI chat response implementation
            string foo = "[OpenAI Response Here] + (chatVal.userResponse: " + chatVal.UserResponse + ")";

            return JsonConvert.SerializeObject(foo);
        }

        // POST api/<ChatController>
        [HttpPost]
        [Route("postTranslate")]
        public async Task<ActionResult<string>> PostTranslate([FromBody] ChatDto chatVal)
        {

            string translatedDef = await TranslateDefinition(chatVal.UserResponse, chatVal.Language);

            return JsonConvert.SerializeObject(translatedDef);
        }

        //DONE: put the microsoft API subscription key and endpoint in a secret environment

        #region Translate API Definition


        // Add your location, also known as region. The default is global.
        // This is required if using a Cognitive Services resource.

        async Task<string> TranslateDefinition(string receivedDef, string lang)
        {
            // Input and output languages are defined as parameters.
            string route = "/translate?api-version=3.0&from=en&to=" + lang;
            object[] body = new object[] { new { Text = receivedDef } };
            var requestBody = JsonConvert.SerializeObject(body);

            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage())
            {
                // Build the request.
                request.Method = HttpMethod.Post;
                request.RequestUri = new Uri(AppConfigs.TranslateApiEndpoint + route);
                request.Content = new StringContent(requestBody, Encoding.UTF8, "application/json");
                request.Headers.Add("Ocp-Apim-Subscription-Key", AppConfigs.TranslateApiKey);
                request.Headers.Add("Ocp-Apim-Subscription-Region", AppConfigs.TranslateApiRegion);

                // Send the request and get response.
                HttpResponseMessage response = await client.SendAsync(request).ConfigureAwait(false);
                // Read response as a string.
                string result = await response.Content.ReadAsStringAsync();
                return JsonConvert.SerializeObject(result);
            }
        }

        #endregion

        #region SpellCheck API Proofing

        //// Add your Azure subscription key to your environment variables.
        //static string key = Environment.GetEnvironmentVariable("BING_AUTOSUGGEST_SUBSCRIPTION_KEY");
        //// Add your Azure Bing Autosuggest endpoint to your environment variables.
        //static string endpoint = Environment.GetEnvironmentVariable("BING_AUTOSUGGEST_ENDPOINT");

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
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", AppConfigs.SpellCheckApiKey);

            // The following headers are optional, but it is recommended they be treated as required.
            // These headers help the service return more accurate results.
            // client.DefaultRequestHeaders.Add("X-Search-Location", ClientLocation);
            // client.DefaultRequestHeaders.Add("X-MSEdge-ClientID", ClientId);
            // client.DefaultRequestHeaders.Add("X-MSEdge-ClientIP", ClientIp);

            HttpResponseMessage response = new HttpResponseMessage();
            string uri = AppConfigs.SpellCheckApiEndpoint + path;

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

        #region Content Moderation API

        /*
		 * AUTHENTICATE
		 * Creates a new client with a validated subscription key and endpoint.
		 */
        public static ContentModeratorClient Authenticate(string key, string endpoint)
        {
            ContentModeratorClient client = new ContentModeratorClient(new ApiKeyServiceClientCredentials(key));
            client.Endpoint = endpoint;

            return client;
        }


        // TEXT MODERATION
        bool ModerateText(string userInput)
        {
            // CLIENTS - each API call needs its own client
            // Create a text review client
            ContentModeratorClient clientText = Authenticate(AppConfigs.ContentModerationApiKey, AppConfigs.ContentModerationApiEndpoint);

            // Remove carriage returns
            userInput = userInput.Replace(Environment.NewLine, " ");
            // Convert string to a byte[], then into a stream (for parameter in ScreenText()).
            byte[] textBytes = Encoding.UTF8.GetBytes(userInput);
            MemoryStream stream = new MemoryStream(textBytes);

            // Moderate the text

            var screenResult = clientText.TextModeration.ScreenText("text/plain", stream, "eng", pII: true);
            return !((null == screenResult.Terms) && (null == screenResult.PII));
        }

        #endregion

    }
}
