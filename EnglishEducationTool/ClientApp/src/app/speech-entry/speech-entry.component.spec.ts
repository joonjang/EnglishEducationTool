import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpeechEntryComponent } from './speech-entry.component';

describe('SpeechEntryComponent', () => {
  let component: SpeechEntryComponent;
  let fixture: ComponentFixture<SpeechEntryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
