import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
//import { ChatDto } from '../Dto/ChatDto';

@Injectable({
  providedIn: 'root'
})

  // service to send user input to back-end to return:
  // Spell Check Proofing
  // TODO: OpenAI response
  // TODO: Content Moderation

export class ChatService {
  //private receivedMessageObject: ChatDto = { userResponse: "", botResponse: "", flaggedTokens: []};
  private sharedObj = new Subject<string>();

  constructor
  (
    protected http: HttpClient,
    @Inject('BASE_URL') protected baseUrl: string,
  )
  { }

  public broadcastMessageBotResponse(userInput: any): Observable<any> {
    return this.http.post(this.baseUrl + "api/Chat/send", userInput);
  }

  public broadcastMessageSpellCheck(userInput: any): Observable<any> {
    return this.http.post(this.baseUrl + "api/Chat/sendSpell", userInput);
  }

  public retrieveMappedObject(): Observable<string> {
    return this.sharedObj.asObservable();
  }
}
