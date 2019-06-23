import { TestBed } from '@angular/core/testing';

import { ApprovedService } from './approved.service';

describe('ApprovedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApprovedService = TestBed.get(ApprovedService);
    expect(service).toBeTruthy();
  });
});
