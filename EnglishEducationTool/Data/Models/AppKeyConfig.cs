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
    }
}
