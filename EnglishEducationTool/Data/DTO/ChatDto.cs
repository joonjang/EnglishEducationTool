using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EnglishEducationTool
{
    public class ChatDto
    {
        [MaxLength(140)]
        public string UserResponse { get; set; }

        public string AIResponse { get; set; }
    }
}
