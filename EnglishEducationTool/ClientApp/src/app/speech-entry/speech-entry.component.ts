import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { ChatDto } from '../Dto/ChatDto';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-speech-entry',
  templateUrl: './speech-entry.component.html',
  styleUrls: ['./speech-entry.component.css'],
  providers: [VoiceRecognitionService]
})


export class SpeechEntryComponent implements OnInit {

  constructor(
    public service: VoiceRecognitionService,
    private router: Router,
    private chatService: ChatService,
  ) {

    this.service.init()

  }


  ngOnInit(): void {

  }

  startService() {
    this.service.start()
    
  }

  sendClick() {
    var inputVal = <ChatDto>{};
    inputVal.UserResponse = (<HTMLInputElement>document.getElementById("userInput")).value;

    this.chatService.broadcastMessage(inputVal);
  }


}

