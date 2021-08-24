import { Injectable } from '@angular/core';
import { Definition, Meaning, RootDictionary } from '../interface/dictionaryAPI';
import { ChatService } from './chat.service';
import { ChatDto } from '../Dto/ChatDto';


@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor(private chatService: ChatService) { }

  async translateDictionary(engDic: RootDictionary[], lang: string): Promise<RootDictionary[]> {
    let jsonSendString: string = "";
    let transDic: RootDictionary[] = engDic;

    engDic.forEach(function (elemnt: RootDictionary) {
      elemnt.meanings.forEach(function (item: Meaning) {
        item.definitions.forEach(function (def: Definition) {
          let fooString = ""
          if (!def.definition.includes(".")) {
            fooString = def.definition + ".";
          } else {
            fooString = def.definition;
          }
          jsonSendString = jsonSendString + " .-^#^#^-. " + fooString;
        })
      })
    })

    let dto: ChatDto = { userResponse: jsonSendString, language: lang }
    let translateArr: string[] | undefined[] = [];

    //////// REAL API
    this.chatService.broadcastMessage(dto, "Translate")
      .subscribe({
        next(response: string) {
          console.log(response);
          translateArr = response.split(".-^#^#^-.");
          translateArr.shift();
        },
        error(err: any) {
          console.log("Error in translation subscription: " + err);
        },
        complete() {
          transDic.forEach(function (elemnt: RootDictionary) {
            elemnt.meanings.forEach(function (item: Meaning) {
              item.definitions.forEach(function (def: Definition) {
                //DONE: issue with potential undefine of translateArr casting to translateDef
                let translatedDef: string | undefined = translateArr.shift()!;

                if (translatedDef.includes('\\",\\"to')) {
                  def.definition = translatedDef.split('\\",\\"to')[0]
                }
                else {
                  def.definition = translatedDef
                }

                //def.definition = translateArr.shift()!;
              })
            })
          })
        }
      })

    return transDic;
  }
}
