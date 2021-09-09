using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishEducationTool.Models
{
    public class AppKeyConfig
    {
        public string TranslateApiKey { get; set; }
        public string TranslateApiEndpoint { get; set; }
        public string TranslateApiRegion { get; set; }

        public string SpellCheckApiKey { get; set; }
        public string SpellCheckApiEndpoint { get; set; }
        public string SpellCheckApiRegion { get; set; }

        public string ContentModerationApiKey { get; set; }
        public string ContentModerationApiEndpoint { get; set; }
        public string ContentModerationApiRegion { get; set; }

        public string SpeechApiKey { get; set; }
        public string SpeechApiEndpoint { get; set; }
        public string SpeechApiRegion { get; set; }

        public string OpenAiKey { get; set; }
    }
}
