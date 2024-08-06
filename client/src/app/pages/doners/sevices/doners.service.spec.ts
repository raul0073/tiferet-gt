import { TestBed } from '@angular/core/testing';

import { DonersService } from './doners.service';

describe('DonersService', () => {
  let service: DonersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DonersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
