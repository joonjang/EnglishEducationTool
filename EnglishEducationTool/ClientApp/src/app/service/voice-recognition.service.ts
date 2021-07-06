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
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords!: string;
  public textObs: any;

  constructor() { }

  init() {

    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    //this.textObs = Observable.create((obs: any) => {
    //  this.recognition.onresult = ((e: any) => {
    //    const transcript = Array.from(e.results)
    //      .map((result: any) => result[0])
    //      .map((result) => result.transcript)
    //      .join('')
    //    obs.next(transcript)
    //    //this.tempWords = transcript;
    //    console.log(transcript);
    //  });
    //})
    this.textObs = Observable.create((obs: any) => {

      this.recognition.addEventListener('result', (e: any) => {
        const transcript = Array.from(e.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join('');
        this.tempWords = transcript;
        console.log("transcript: " + transcript);
        console.log("this.text : " + this.text);

        //this.wordConcat();
        obs.next(this.text + " " + this.tempWords);
      });

      //this.wordConcat();
      //obs.next(this.text);
    });

    
  }

  //public textObservation() {
  //  return Observable.create((obs:any) => {
  //    obs.next(this.tempWords);
  //  })
  //}

  start() {
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("Speech recognition started")

    

    //this.recognition.addEventListener('result', (condition: any) => {
    //  this.text = this.tempWords
    //});
      
    this.recognition.addEventListener('end', (condition: any) => {
      if (this.isStoppedSpeechRecog) {
        this.recognition.stop();
        console.log("End speech recognition")
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });

    //this.interimTranscript();
    //this.finalTranscript();

    //this.recognition.addEventListener('result', (condition: any) => {
    //this.recognition.addEventListener('end', (condition: any) => {
    //    this.wordConcat()
    //});
  }

  stop() {
    this.isStoppedSpeechRecog = true;
    this.recognition.stop();
    console.log("End speech recognition")
  }


  //finalTranscript() {

  //  //this.recognition.addEventListener('result', (condition: any) => {
  //  this.recognition.addEventListener('end', (condition: any) => {
  //    this.wordConcat()
  //  });
  //}

  //interimTranscript() {
    
  //  this.recognition.addEventListener('result', (condition: any) => {
  //    this.wordConcat()
  //  });
  //}
  

  wordConcat() {

    this.text = this.text + ' ' + this.tempWords + '.';
    //this.text = this.tempWords + '.';
    this.tempWords = '';

  }
}
