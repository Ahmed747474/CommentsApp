/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpinerService } from './spiner.service';

describe('Service: Spiner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpinerService]
    });
  });

  it('should ...', inject([SpinerService], (service: SpinerService) => {
    expect(service).toBeTruthy();
  }));
});
