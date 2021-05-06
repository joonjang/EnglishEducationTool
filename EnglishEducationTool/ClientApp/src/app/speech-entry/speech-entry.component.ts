import { Component, OnInit } from '@angular/core';
import { VoiceRecognitionService } from '../service/voice-recognition.service';

@Component({
  selector: 'app-speech-entry',
  templateUrl: './speech-entry.component.html',
  styleUrls: ['./speech-entry.component.css'],
  providers: [VoiceRecognitionService]
})


export class SpeechEntryComponent implements OnInit {

  constructor(
    public service: VoiceRecognitionService,
  ) {
    this.service.init()
  }


  ngOnInit(): void {
  }

  startService() {
    this.service.start()
  }

}

