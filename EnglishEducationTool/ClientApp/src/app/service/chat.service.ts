import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ChatDto } from '../Dto/ChatDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private receivedMessageObject: ChatDto = { userResponse: "", botResponse: "", flaggedTokens: []};
  private sharedObj = new Subject<ChatDto>();

  constructor
  (
    protected http: HttpClient,
    @Inject('BASE_URL') protected baseUrl: string,
  )
  { }

  public broadcastMessage(chatDto: any): Observable<any> {
    return this.http.post(this.baseUrl + "api/Chat/send", chatDto);
  }

  public retrieveMappedObject(): Observable<ChatDto> {
    return this.sharedObj.asObservable();
  }
}
