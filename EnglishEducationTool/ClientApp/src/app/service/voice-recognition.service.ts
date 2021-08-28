import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})

  //https://codeburst.io/creating-a-speech-recognition-app-in-angular-8d1fd8d977ca
  //https://github.com/Donishka/angular-voice-recognition

export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  public isStoppedSpeechRecog = true;
  public text = '';
  tempWords!: string;
  public textObs: any;

  constructor() { }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';
    this.textObs = Observable.create((obs: any) => {
      this.recognition.addEventListener('result', (e: any) => {
        const transcript = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        this.tempWords = transcript;
        obs.next(this.text + " " + this.tempWords);
      });
    });
  }

  start(formControlInput: string) {
    // DONE:D! make the service text equal to form control once dirty
    this.text = formControlInput;
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }

  stop(formControlInput: string) {
    // DONE:D! make the service text equal to form control once dirty
    this.text = formControlInput;
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords;
    this.tempWords = '';
  }
}
