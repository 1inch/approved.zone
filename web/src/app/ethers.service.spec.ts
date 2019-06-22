import { TestBed } from '@angular/core/testing';

import { EthersService } from './ethers.service';

describe('EthersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EthersService = TestBed.get(EthersService);
    expect(service).toBeTruthy();
  });
});
