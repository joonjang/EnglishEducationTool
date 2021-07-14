import { Injectable } from '@angular/core';
import { RootDictionary } from '../interface/dictionaryAPI';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  //https://api.dictionaryapi.dev/api/v2/entries/en_US/hello
  private dicUrl = new URL("https://api.dictionaryapi.dev/api/v2/entries/en_US/");

  constructor(protected http: HttpClient) { }

  getWord(word: string): Observable<RootDictionary[]> {
    return this.http.get<RootDictionary[]>(this.dicUrl + word);
  }

  getMockWord(word: string | null): Observable<RootDictionary[]> {
    const json = '[{"word":"blue","phonetics":[{"text":"/blu/","audio":"https://lex-audio.useremarkable.com/mp3/blue_us_1.mp3"}],"meanings":[{"partOfSpeech":"verb","definitions":[{"definition":"Make or become blue.","example":"the light dims, bluing the retina"},{"definition":"Wash (white clothes) with bluing.","example":"they blued the shirts and starched the uniforms"}]},{"partOfSpeech":"noun","definitions":[{"definition":"Blue color or pigment.","example":"she was dressed in blue"},{"definition":"A small butterfly, the male of which is predominantly blue while the female is typically brown.","example":"The male blues show much more interest in these yellow bushes."}]},{"partOfSpeech":"adjective","definitions":[{"definition":"Of a color intermediate between green and violet, as of the sky or sea on a sunny day.","synonyms":["sky blue","azure","cobalt","cobalt blue","sapphire","cerulean","navy","navy blue","saxe","saxe blue","Oxford blue","Cambridge blue","ultramarine","lapis lazuli","indigo","aquamarine","turquoise","teal","teal blue","cyan","of the colour of the sky","of the colour of the sea"],"example":"the clear blue sky"},{"definition":"(of a person or mood) melancholy, sad, or depressed.","synonyms":["depressed","down","sad","saddened","unhappy","melancholy","miserable","sorrowful","gloomy","dejected","downhearted","disheartened","despondent","dispirited","low","in low spirits","low-spirited","heavy-hearted","glum","morose","dismal","downcast","cast down","tearful"]},{"definition":"(of a movie, joke, or story) with sexual or pornographic content.","synonyms":["indecent","dirty","rude","coarse","vulgar","bawdy","lewd","racy","risqué","salacious","naughty","wicked","improper","unseemly","smutty","spicy","raw","off colour","ribald","Rabelaisian"]},{"definition":"Rigidly religious or moralistic; puritanical."}]}]},{"word":"blue","phonetics":[{"text":"/blu/","audio":"https://lex-audio.useremarkable.com/mp3/blue_us_1.mp3"}],"meanings":[{"partOfSpeech":"transitive verb","definitions":[{"definition":"Squander or recklessly spend (money)."}]}]}]';
    const json2 = '[{"word":"best","phonetics":[{"text":"/bɛst/","audio":"https://lex-audio.useremarkable.com/mp3/best_us_1.mp3"}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"That which is the most excellent, outstanding, or desirable.","synonyms":["finest","top","cream","choice","choicest","prime","elite","crème de la crème","flower","jewel in the crown","nonpareil"],"example":"buy the best you can afford"}]},{"partOfSpeech":"adjective","definitions":[{"definition":"Of the most excellent, effective, or desirable type or quality.","synonyms":["finest","greatest","top","foremost","leading","pre-eminent","premier","prime","first","chief","principal","supreme","of the highest quality","superlative","unrivalled","second to none","without equal","nonpareil","unsurpassed","unsurpassable","peerless","matchless","unparalleled","unbeaten","unbeatable","unexcelled","optimum","optimal","ultimate","surpassing","incomparable","ideal","perfect"],"example":"the best pitcher in the league"}]},{"partOfSpeech":"adverb","definitions":[{"definition":"To the highest degree; most.","synonyms":["most","to the greatest degree","to the highest degree"],"example":"you knew him best"}]},{"partOfSpeech":"transitive verb","definitions":[{"definition":"Outwit or get the better of (someone)","synonyms":["defeat","beat","get the better of","gain the advantage over","get the upper hand over","outdo","outwit","outsmart","worst","be more than a match for","prevail over","conquer","vanquish","trounce","triumph over"]}]}]}]'
    const json3 = '[{"phonetics":[{"text":"/sɛt/","audio":"https://lex-audio.useremarkable.com/mp3/set_us_1.mp3"}],"word":"set","origin":"Late Old English, past participle of set.","meanings":[{"partOfSpeech":"verb","definitions":[{"definition":"Put, lay, or stand (something) in a specified place or position.","synonyms":["put","place","put down","lay","lay down","deposit","position","settle","station"],"example":"Dana set the mug of tea down"},{"definition":"Put or bring into a specified state.","synonyms":["start","begin","activate","institute","initiate","launch","get under way","get going","get in operation","get functioning","get working","get off the ground","get the ball rolling","set the ball rolling","start the ball rolling"],"example":"the hostages were set free"},{"definition":"Adjust (a clock or watch), typically to show the right time.","synonyms":["adjust","regulate","synchronize","coordinate","harmonize"],"example":"set your watch immediately to local time at your destination"},{"definition":"Harden into a solid or semisolid state.","synonyms":["solidify","harden","become solid","become hard","stiffen","thicken","gel"],"example":"cook for a further thirty-five minutes until the filling has set"},{"definition":"(of the sun, moon, or another celestial body) appear to move toward and below the earth*s horizon as the earth rotates.","synonyms":["go down","sink","decline","descend","drop","subside"],"example":"the sun was setting and a warm red glow filled the sky"},{"definition":"(of a tide or current) take or have a specified direction or course."},{"definition":"Start(a fire)","example":"the school had been broken into and the fire had been set"},{"definition":"(of blossom or a tree) develop into or produce(fruit)","example":"wait until first flowers have set fruit before planting out the peppers"},{"definition":"Sit.","example":"a perfect lady—just set in her seat and stared"}]}]},{"word":"set","phonetics":[{"text":" / sɛt / ","audio":"https://lex-audio.useremarkable.com/mp3/set_us_1.mp3"}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"A group or collection of things that belong together or resemble one another or are usually found together.","synonyms":["group","collection","series","complete series"],"example":"a set of false teeth"},{"definition":"The way in which something is set, disposed, or positioned.","synonyms":["expression","look"]},{"definition":"A radio or television receiver.","example":"a TV set"},{"definition":"A collection of scenery, stage furniture, and other articles used for a particular scene in a play or film.","synonyms":["stage furniture","stage set","stage setting","setting","scenery","backdrop","wings","flats"],"example":"Behind every actor you*ll find props, stage scenery and sets."},{"definition":"An arrangement of the hair when damp so that it dries in the required style.","example":"a shampoo and set"},{"definition":"A cutting, young plant, or bulb used in the propagation of new plants."},{"definition":"The last coat of plaster on a wall."},{"definition":"The amount of spacing in type controlling the distance between letters."},{"definition":"variant spelling of sett"}]}]},{"word":"set","phonetics":[{"text":"/sɛt/","audio":"https://lex-audio.useremarkable.com/mp3/set_us_1.mp3"}],"meanings":[{"partOfSpeech":"adjective","definitions":[{"definition":"Fixed or arranged in advance.","synonyms":["fixed","established","hard and fast","determined","predetermined","arranged","prearranged","prescribed","scheduled","specified","defined","appointed","decided","agreed"],"example":"there is no set procedure"},{"definition":"Ready, prepared, or likely to do something.","synonyms":["ready","prepared","organized","equipped","primed"],"example":"the first family was set for a quiet night of rest"}]}]}]';

    var mockJsonWord: RootDictionary[] = [{
      word: "",
      phonetics: [{
        text: "",
        audio: ""
      }],
      meanings: [{
        partOfSpeech: "",
        definitions: [{
          definition: "",
          synonyms: [""],
          example: ""
        }]
      }]
    }];

    switch (word) {
      case "blue":
        mockJsonWord = JSON.parse(json);
        break;
      case "best":
        mockJsonWord = JSON.parse(json2);
        break;
      case "set":
        mockJsonWord = JSON.parse(json3);
    }

    return of(mockJsonWord);
  }
}
