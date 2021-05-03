import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechEntryComponent } from './speech-entry.component';

describe('SpeechEntryComponent', () => {
  let component: SpeechEntryComponent;
  let fixture: ComponentFixture<SpeechEntryComponent>;

  beforeEach(async(() => {
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
