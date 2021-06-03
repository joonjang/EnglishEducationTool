import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!: string;
  public textObs: any;

  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.textObs = Observable.create((obs: any) => {
      this.recognition.onresult = ((e: any) => {
        const transcript = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('')
        obs.next(transcript)
        //this.tempWords = transcript;
        console.log(transcript);
      });
    })
    
  }

  //public textObservation() {
  //  return Observable.create((obs:any) => {
  //    obs.next(this.tempWords);
  //  })
  //}

  start() {
    this.recognition.start();
    console.log("Speech recognition started")

    this.recognition.addEventListener('result', (condition: any) => {
      this.text = this.tempWords;
    });

    //this.interimTranscript();
    //this.finalTranscript();

    //this.recognition.addEventListener('result', (condition: any) => {
    //this.recognition.addEventListener('end', (condition: any) => {
    //    this.wordConcat()
    //});
  }

  finalTranscript() {

    //this.recognition.addEventListener('result', (condition: any) => {
    this.recognition.addEventListener('end', (condition: any) => {
      this.wordConcat()
    });
  }

  interimTranscript() {
    
    this.recognition.addEventListener('result', (condition: any) => {
      this.wordConcat()
    });
  }
  

  wordConcat() {

    //this.text = this.text + ' ' + this.tempWords + '.';
    this.text = this.tempWords + '.';
    this.tempWords = '';
    
  }
}
