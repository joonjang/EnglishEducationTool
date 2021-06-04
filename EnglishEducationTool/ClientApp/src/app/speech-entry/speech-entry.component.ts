import { Component, Inject, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { ChatDto } from '../Dto/ChatDto';
import { ChatService } from '../service/chat.service';
//import { BadWordsFilter } from 'bad-words/';
import BadWordsFilter from 'bad-words';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';

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

  messages =
    [
      "User: Hello",
      "AI: Hello",
    ];

  filter = new BadWordsFilter();
  badwordWarning: Boolean = false;
  
  inputFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(140),
    //maxLength in: ChatDto.cs, speech-entry component html and typescript
  ]);

  searchFormControl = new FormControl('', []);

  inputCount = this.inputFormControl.value.length;
  matcher = new MyErrorStateMatcher();

  constructor(
    public service: VoiceRecognitionService,
    private router: Router,
    private chatService: ChatService,
    private _ngZone: NgZone
  ) {
    this.service.init();

    this.service.textObs.subscribe((e: string) => {
      this.inputFormControl.setValue(e);
      this.inputFormControl.markAsDirty();
    })

  }

  ngOnInit(): void {
  }

  

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  startService() {
    this.service.start();

    

  }

  sendClick() {
    var inputVal = <ChatDto>{};
    inputVal.UserResponse = this.inputFormControl.value;

    if (this.filter.isProfane(inputVal.UserResponse)) {
      console.log("bad word detected")
      this.badwordWarning = true;
    }
    else {
      this.messages.push("User: " + inputVal.UserResponse);

      console.log("sent to back-end")
      this.chatService.broadcastMessage(inputVal);

      this.inputFormControl.reset("");
    }
  }

  closeWarning() {
    this.badwordWarning = false;
  }

  fooFunc() {
    this.messages.push("User: Hello", "AI: Hello");
      
  }

}

