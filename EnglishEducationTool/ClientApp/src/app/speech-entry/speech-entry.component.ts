import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { ChatDto } from '../Dto/ChatDto';
import { ChatService } from '../service/chat.service';
//import { BadWordsFilter } from 'bad-words/';
import BadWordsFilter from 'bad-words';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is over char limit or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid &&  (isSubmitted || control.touched || control.dirty));
  }
}


@Component({
  selector: 'app-speech-entry',
  templateUrl: './speech-entry.component.html',
  styleUrls: ['./speech-entry.component.css'],
  providers: [VoiceRecognitionService]
})

export class SpeechEntryComponent implements OnInit {

  filter = new BadWordsFilter();
  badwordWarning: Boolean = false;
  
  inputFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(140),
  ]);

  inputCount = this.inputFormControl.value.length;


  matcher = new MyErrorStateMatcher();

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
    inputVal.UserResponse = this.inputFormControl.value;

    if (this.filter.isProfane(inputVal.UserResponse)) {
      console.log("bad word detected")
      this.badwordWarning = true;
    }
    else {
      console.log("sent to back-end")
      this.chatService.broadcastMessage(inputVal);
    }
  }

  closeWarning() {
    this.badwordWarning = false;
  }

}

//export class SpeechEntryComponent implements OnInit { 

//  filter = new BadWordsFilter();
//  badwordWarning: Boolean = false;
//  inputCount = "test";

//  constructor(
//    public service: VoiceRecognitionService,
//    private router: Router,
//    private chatService: ChatService,
//  ) {

//    this.service.init()

//  }


//  ngOnInit(): void {


//  }

//  startService() {
//    this.service.start()
    
//  }

//  sendClick() {
//    var inputVal = <ChatDto>{};
//    inputVal.UserResponse = (<HTMLInputElement>document.getElementById("userInput")).value;

//    if (this.filter.isProfane(inputVal.UserResponse)) {
//      console.log("bad word detected")
//      this.badwordWarning = true;
//    }
//    else {
//      console.log("sent to back-end")
//      this.chatService.broadcastMessage(inputVal);
//    } 
//  }

  

//  closeWarning() {
//    this.badwordWarning = false;
//  }

//}

