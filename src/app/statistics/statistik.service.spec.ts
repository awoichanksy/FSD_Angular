import {TestBed} from '@angular/core/testing';

import {StatistikService} from './statistik.service';

describe('StatistikService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StatistikService = TestBed.get(StatistikService);
    expect(service).toBeTruthy();
  });
});
