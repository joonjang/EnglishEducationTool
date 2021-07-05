import { Component, Inject, OnInit, ViewChild, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { VoiceRecognitionService } from '../service/voice-recognition.service';
import { ChatDto, FlaggedToken } from '../Dto/ChatDto';
import { ChatService } from '../service/chat.service';
//import { BadWordsFilter } from 'bad-words/';
import BadWordsFilter from 'bad-words';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { take } from 'rxjs/operators';
import { DictionaryService } from '../service/dictionary.service';
import { RootDictionary } from '../interface/dictionaryAPI';

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
  wordToProof = "HELLO JOON I LOVE YOU";
  
  inputFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(140),
    //maxLength in: ChatDto.cs, speech-entry component html and typescript
  ]);

  searchFormControl = new FormControl('', []);

  inputCount = this.inputFormControl.value.length;
  matcher = new MyErrorStateMatcher();

 
  public dicObj: RootDictionary[] = [{
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

  constructor(
    public service: VoiceRecognitionService,
    private router: Router,
    private chatService: ChatService,
    private dictionaryService: DictionaryService,
    private _ngZone: NgZone
  ) {
    this.service.init();

    this.service.textObs.subscribe((e: string) => {
      this.inputFormControl.setValue(e);
      this.inputFormControl.markAsDirty();
    })

  }

  ngOnInit(): void {
    this.getDefinition();
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
    inputVal.userResponse = this.inputFormControl.value;

    if (this.filter.isProfane(inputVal.userResponse)) {
      console.log("bad word detected")
      this.badwordWarning = true;
    }
    else {

      //user input to search in live production version
      //this.wordToProof = this.inputFormControl.value;
      //todo:D debug string input used to correct spelling
      this.wordToProof = "Hollo, wrld!"
      //TODO: HYPERLINK THE USER INPUT WITH JSON INFO OF CORRECTED SPELLING AND HOW MANY TOKEN
      // SUGGESTIONS HAVE BEEN RECEIVED
     

      this.messages.push("User: " + inputVal.userResponse); 

      console.log("sent to back-end");

      // receives JSON data and turns to FlaggedToken object
      this.chatService.broadcastMessage(inputVal).subscribe((data: ChatDto) => {
        this.spellCheckObject(data.flaggedTokens);

      });

      this.inputFormControl.reset("");

      
    }
  }

  // todo: DO THIS FIRST, can received json data, but need to do something with it. can only receive atm
  // possibly callibrate sync and await use, dont understand if its being used properly
  spellCheckObject(flaggedCorrection: FlaggedToken[]){
    console.log("inside the FlaggedToken object inferencer");



    console.log(flaggedCorrection);

  }

  closeWarning() {
    this.badwordWarning = false;
  }

  ///// TODO: implement dictionary API service so the component doesnt know the logic, only exposed to methods

  getDefinition() {

    let defineWord =  this.searchFormControl.value;

    // todo:D debugging with mock data
    this.dictionaryService.getMockWord(defineWord).subscribe(data => {
      this.dicObj = data;
      console.log(this.dicObj);
    }, error => console.log(error));

    ////TODO: mispelled word 
    //// microsoft dictionary API
    //if (defineWord != "") {
    //  this.dictionaryService.getWord(defineWord).subscribe(data => {
    //    this.dicObj = data;
    //    console.log(this.dicObj);
    //  }, error => console.log(error));
    //}

  }

  playAudio() {
    let audio = new Audio();
    audio.src = this.dicObj[0].phonetics[0].audio;
    audio.load();
    audio.play();
  }

  ////foooooooooooo (fighters)

  fooFunc() {
    //this.messages.push("User: Hello", "AI: Hello");
    //this.searchFormControl.setValue("test");

    //try {
    //  var foo = this.getDefinition().subscribe(data => {
    //    this.dicObject?.meanings = data.meanings;
    //    this.dicObject?.phonetics = data.phonetics;
    //    this.dicObject!?.word = data.word;
    //  });
    //} catch {
    //  console.log('failure');
    //}
    
    var x = "foo"
    console.log(x);
  }

}

