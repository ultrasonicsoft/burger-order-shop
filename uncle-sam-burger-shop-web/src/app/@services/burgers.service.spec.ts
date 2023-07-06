import { TestBed } from '@angular/core/testing';

import { BurgersService } from './burgers.service';

describe('BurgersService', () => {
  let service: BurgersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BurgersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
