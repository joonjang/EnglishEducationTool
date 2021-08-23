import { Component, Inject, OnInit, ViewChild, NgZone, ElementRef, AfterViewInit } from '@angular/core';
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
import { TranslationService } from '../service/translation.service';


/** Error when invalid control is over char limit or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (isSubmitted || control.touched || control.dirty));
  }
}

const EMPTY_SPELLCHECK = [{
  offset: 0,
  token: "-",
  type: "",
  suggestions: [
    {
      suggestionSuggestion: "-",
      score: 0
    }
  ]
}];

const EMPTY_DIC = [{
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

@Component({
  selector: 'app-speech-entry',
  templateUrl: './speech-entry.component.html',
  styleUrls: ['./speech-entry.component.css'],
  providers: [VoiceRecognitionService]
})

export class SpeechEntryComponent implements OnInit {

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  @ViewChild('tw', { static: false }) tw!: ElementRef;


  queueAiMsg = "";
  messages =
    [
      "User: Hello",
    ];
  filter = new BadWordsFilter();
  badwordWarning: Boolean = false;
  wordToProof = "";
  inputFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(140),
    //maxLength in: ChatDto.cs, speech-entry component html and typescript
  ]);
  searchFormControl = new FormControl('', []);
  inputCount = this.inputFormControl.value.length;
  matcher = new MyErrorStateMatcher();
  displayedColumns: string[] = ['word', 'suggestions'];
  dataSource = EMPTY_SPELLCHECK;
  dicObj: RootDictionary[] = EMPTY_DIC;
  languageFormControl = new FormControl("en");

  audioBlob: any;


  constructor(
    public service: VoiceRecognitionService,
    private router: Router,
    private chatService: ChatService,
    private dictionaryService: DictionaryService,
    private _ngZone: NgZone,
    private translateService: TranslationService
  ) {
    this.service.init();
    this.service.textObs.subscribe((e: string) => {
      this.inputFormControl.setValue(e);
      this.inputFormControl.markAsDirty();
    })
  }

  ngOnInit(): void {
    this.getDefinition

  }

  ngAfterViewInit(): void {
    this.typeWriter("Hello")
  }



  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  startService() {
    // DONE:D! make the service text equal to form control once dirty
    this.service.start(this.inputFormControl.value);
  }

  sendClick() {
    var inputVal = <ChatDto>{};
    inputVal.userResponse = this.inputFormControl.value;

    if (this.filter.isProfane(inputVal.userResponse)) {
      console.log("bad word detected")

      this.messages.push("User: " + inputVal.userResponse);
      this.inputFormControl.reset("");
      this.service.stop(this.inputFormControl.value);

      this.badwordWarning = true;
    }
    else {
      ////todo:D debug string input used to correct spelling
      //this.wordToProof = "Hollo, wrld! I am eaten a apple"

      //BACKLOG: HYPERLINK THE USER INPUT WITH JSON INFO OF CORRECTED SPELLING AND HOW MANY TOKEN
      // SUGGESTIONS HAVE BEEN RECEIVED
      this.chatService.broadcastMessage(inputVal, "Bot").subscribe((data: ChatDto) => {
        this.audioBlob = data.synthAudio;
        this.messages.push("AI: " + this.queueAiMsg)

        this.messages.push("User: " + inputVal.userResponse);
        this.inputFormControl.reset("");
        this.service.stop(this.inputFormControl.value);

        this.typeWriter(data.botResponse);
      });
    }

  }

  spellCheckFunc() {
    var inputVal = <ChatDto>{};
    inputVal.userResponse = this.inputFormControl.value;

    if (this.filter.isProfane(inputVal.userResponse)) {
      console.log("bad word detected")
      this.badwordWarning = true;
    }
    else {
      // receives JSON data and turns to FlaggedToken object
      //DONE:!!! spell checking toggle
      //user input to search in live production version
      this.wordToProof = this.inputFormControl.value;
      this.chatService.broadcastMessage(inputVal, "Spell").subscribe((data: FlaggedToken[]) => {
        if (data.length > 0) {
          this.spellCheckObject(data);
        } else {
          this.dataSource = EMPTY_SPELLCHECK
        }
        console.log(data);
      });
      this.service.stop(this.inputFormControl.value);
    }
  }

  // DONE: can received json data, but need to do something with it. can only receive atm
  // possibly callibrate sync and await use, dont understand if its being used properly
  spellCheckObject(flaggedCorrection: FlaggedToken[]) {
    console.log("inside the FlaggedToken object inferencer");
    this.dataSource = flaggedCorrection;
  }

  closeWarning() {
    this.badwordWarning = false; 
  }

  ///// DONE: implement dictionary API service so the component doesnt know the logic, only exposed to methods
  getDefinition() {
    let defineWord = this.searchFormControl.value;

    ////todo:D debugging with mock data definition
    //  "Hollo, wrld! I am eaten a apple"
    //this.dictionaryService.getMockWord(defineWord).subscribe(data => {
    //  this.dicObj = data;
    //  console.log(this.dicObj);
    //}, error => console.log(error));

    ////// microsoft dictionary API
    if (defineWord != "") {
      this.dictionaryService.getWord(defineWord).subscribe(data => {
        this.dicObj = data;
        console.log(this.dicObj);
      }, error => {
        console.log(error);
        this.dicObj = EMPTY_DIC;
      })
    }

  }

  playAudio() {
    let audio = new Audio();
    audio.src = this.dicObj[0].phonetics[0].audio;
    audio.load();
    audio.play();
  }

  //DONE: stop listening button for voice recognition
  stopListening() {
    this.service.stop(this.inputFormControl.value);
  }

  //DONE: TRANSLATE FRONT END TYPESCRIPT SERVICE TO COMPONENT
  //todo: go back to original english definition capability
  async translate() {
    this.dicObj = await this.translateService.translateDictionary(this.dicObj, this.languageFormControl.value);
  }

  //TODO: !!! AUDIO SYNTH METHOD FRONT END

  synth() {

    let objectURL = "data:audio/wav;base64," + this.audioBlob;

    let audio = new Audio();
    audio.src = objectURL;
    audio.play().catch(err => console.log(err));
  }

  async typeWriter(txt: string | undefined) {
    this.tw.nativeElement.innerHTML = "";
    await new Promise(f => setTimeout(f, 400));
    this.tw.nativeElement.innerHTML = "AI: ";
    let SPEED = 50;
    let WAITTIME = 8
    let DOTWAIT = 400;

    for (var i = 0; i < WAITTIME; i++) {
      if (i % 3 == 0) {
        this.tw.nativeElement.innerHTML = "AI: ";
        await new Promise(f => setTimeout(f, DOTWAIT));
      } 
      this.tw.nativeElement.innerHTML += ".";
      await new Promise(f => setTimeout(f, DOTWAIT));
      
    }

    this.tw.nativeElement.innerHTML = "AI: ";

    if (txt != undefined) {

      this.queueAiMsg = txt
      for (var i = 0; i < txt.length; i++) {
        //document.getElementById("demo").innerHTML += txt.charAt(i);
        this.tw.nativeElement.innerHTML += txt.charAt(i);
        await new Promise(f => setTimeout(f, SPEED));
      }
    }
  }
}
