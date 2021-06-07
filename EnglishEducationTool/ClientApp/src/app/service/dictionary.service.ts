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
    const mockJsonWord: RootDictionary[] = JSON.parse(json2);
    return of(mockJsonWord);
  }
}
