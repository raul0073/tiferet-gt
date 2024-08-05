import { TestBed } from '@angular/core/testing';

import { SynagogueService } from './synagogue.service';

describe('SynagogueService', () => {
  let service: SynagogueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SynagogueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
