import { Injectable } from '@angular/core';
import { Definition, Meaning, RootDictionary } from '../interface/dictionaryAPI';
import { ChatService } from './chat.service';
import { ChatDto } from '../Dto/ChatDto';


@Injectable({
  providedIn: 'root'
})

export class TranslationService {

  constructor(private chatService: ChatService) { }

  async translateDictionary(engDic: RootDictionary[]): Promise<RootDictionary[]> {
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
          jsonSendString = jsonSendString + " ## " + fooString;
        })
      })
    })

    let dto: ChatDto = { userResponse: jsonSendString }
    let translateArr: string[] | undefined[] = [];

    ////// REAL API
    this.chatService.broadcastMessage(dto, "Translate")
      .subscribe({
        next(response: string) {
          translateArr = response.split(" ## ");
          translateArr.shift();
        },
        error(err: any) {
          console.log("Error in translation subscription: " + err);
        },
        complete() {
          transDic.forEach(function (elemnt: RootDictionary) {
            elemnt.meanings.forEach(function (item: Meaning) {
              item.definitions.forEach(function (def: Definition) {
                //todo: issue with potential undefine of translateArr casting to translateDef
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
          console.log(transDic);
          console.log("done translation");
        }
      })

    //todo:D translation mock json data
    ////// MOCK DATA
    //let foo = "[{\"translations\":[{\"text\":\" ## 지정된 장소 또는 위치에 넣거나 누워 있거나 서 있습니다. ## 지정된 상태로 넣거나 가져 올 수 있습니다. ## 조정(시계 또는 시계),일반적으로 적절한 시기를 표시합니다. ## 견고하거나 반고체 상태로 굳어. ## (태양, 달, 또는 다른 천체의)은 지구가 회전할 때 지구 * 수평선 아래로 이동하는 것처럼 보입니다. ## (조류 또는 전류의) 걸릴 또는 지정된 방향이나 과정을 가지고있다. ## 시작(화재). ## (꽃이나 나무)로 발전하거나 생산 (과일). ## 앉는다. ## 함께 속하거나 서로 닮거나 일반적으로 함께 발견되는 것들의 그룹 또는 컬렉션. ## 무언가를 설정, 폐기 또는 배치하는 방식입니다. ## 라디오 또는 텔레비전 수신기. ## 연극이나 영화의 특정 장면에 사용되는 풍경, 무대 가구 및 기타 기사 컬렉션. ## 필요한 스타일로 건조되도록 젖은 때 머리카락의 배열. ## 새로운 식물의 전파에 사용되는 절단, 젊은 식물 또는 전구. ## 벽에 석고의 마지막 코트. ## 문자 사이의 거리를 제어하는 유형의 간격의 양입니다. ## sett의 변형 맞춤법. ## 사전에 고정 또는 정렬. ## 준비, 준비, 또는 뭔가를 할 가능성이.\",\"to\":\"ko\"}]}]";
    //translateArr = foo.split(" ## ");
    //translateArr.shift();

      //transDic.forEach(function (elemnt: RootDictionary) {
      //  elemnt.meanings.forEach(function (item: Meaning) {
      //    item.definitions.forEach(function (def: Definition) {
      //      let translatedDef = translateArr.shift()!;
      //      if (translatedDef.includes('\",\"to\":')) {
      //        def.definition = translatedDef.split('\",\"to\":')[0]
      //      }
      //      else {
      //        def.definition = translatedDef
      //      }
      //    })
      //  })
      //})

    console.log(transDic);
    console.log("line before return");
    return transDic;
  }
}
