import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ChatDto } from '../Dto/ChatDto';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private sharedObj = new Subject<ChatDto>();

  constructor
  (
    protected http: HttpClient,
    @Inject('BASE_URL') protected baseUrl: string,
  )
  { }

  public broadcastMessage(chatDto: any, methodChoice: string): Observable<any> {
    return this.http.post(this.baseUrl + "api/Chat/post" + methodChoice, chatDto);
  }

  //public getMessage(chatDto: any, methodChoice: string): Observable<any> {
  //  return this.http.get(this.baseUrl + "api/Chat/get" + methodChoice, chatDto);
  //}

  public retrieveMappedObject(): Observable<ChatDto> {
    return this.sharedObj.asObservable();
  }
}
