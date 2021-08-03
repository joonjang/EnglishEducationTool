using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.Serialization;

namespace EnglishEducationTool.Data.Models
{
    public class SpeechSynthesis
    {
    }

	[XmlRoot(ElementName = "prosody", Namespace = "http://www.w3.org/2001/10/synthesis")]
	public class Prosody
	{
		[XmlAttribute(AttributeName = "rate")]
		public string Rate { get; set; }
		[XmlAttribute(AttributeName = "pitch")]
		public string Pitch { get; set; }
		[XmlText]
		public string Text { get; set; }
	}

	[XmlRoot(ElementName = "express-as", Namespace = "http://www.w3.org/2001/mstts")]
	public class Expressas
	{
		[XmlElement(ElementName = "prosody", Namespace = "http://www.w3.org/2001/10/synthesis")]
		public Prosody Prosody { get; set; }
		[XmlAttribute(AttributeName = "style")]
		public string Style { get; set; }
	}

	[XmlRoot(ElementName = "voice", Namespace = "http://www.w3.org/2001/10/synthesis")]
	public class Voice
	{
		[XmlElement(ElementName = "express-as", Namespace = "http://www.w3.org/2001/mstts")]
		public Expressas Expressas { get; set; }
		[XmlAttribute(AttributeName = "name")]
		public string Name { get; set; }
	}

	[XmlRoot(ElementName = "speak", Namespace = "http://www.w3.org/2001/10/synthesis")]
	public class Speak
	{
		[XmlElement(ElementName = "voice", Namespace = "http://www.w3.org/2001/10/synthesis")]
		public Voice Voice { get; set; }
		[XmlAttribute(AttributeName = "xmlns")]
		public string Xmlns { get; set; }
		[XmlAttribute(AttributeName = "mstts", Namespace = "http://www.w3.org/2000/xmlns/")]
		public string Mstts { get; set; }
		[XmlAttribute(AttributeName = "emo", Namespace = "http://www.w3.org/2000/xmlns/")]
		public string Emo { get; set; }
		[XmlAttribute(AttributeName = "version")]
		public string Version { get; set; }
		[XmlAttribute(AttributeName = "lang", Namespace = "http://www.w3.org/XML/1998/namespace")]
		public string Lang { get; set; }
	}
}
