import { TestBed } from '@angular/core/testing';

import { TranslateDefinitionService } from './translate-definition.service';

describe('TranslateDefinitionService', () => {
  let service: TranslateDefinitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateDefinitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
