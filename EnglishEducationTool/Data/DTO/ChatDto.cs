using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace EnglishEducationTool
{
    public class ChatDto
    {
        [MaxLength(140)]
        public string UserResponse { get; set; }
    }

    public partial class SpellCheck
    {
        [JsonProperty("_type")]
        public string Type { get; set; }

        [JsonProperty("flaggedTokens")]
        public FlaggedToken[] FlaggedTokens { get; set; }
    }

    public partial class FlaggedToken
    {
        [JsonProperty("offset")]
        public long Offset { get; set; }

        [JsonProperty("token")]
        public string Token { get; set; }

        [JsonProperty("type")]
        public string Type { get; set; }

        [JsonProperty("suggestions")]
        public Suggestion[] Suggestions { get; set; }
    }

    public partial class Suggestion
    {
        [JsonProperty("suggestion")]
        public string SuggestionSuggestion { get; set; }

        [JsonProperty("score")]
        public double Score { get; set; }
    }

    public partial class SpellCheck
    {
        public static SpellCheck FromJson(string json) => JsonConvert.DeserializeObject<SpellCheck>(json, EnglishEducationTool.Converter.Settings);
    }

    public static class Serialize
    {
        public static string ToJson(this SpellCheck self) => JsonConvert.SerializeObject(self, EnglishEducationTool.Converter.Settings);
    }

    internal static class Converter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}
