import { TestBed } from '@angular/core/testing';

import { DrawEventbusService } from './draw-eventbus.service';

describe('DrawEventbusService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DrawEventbusService = TestBed.get(DrawEventbusService);
    expect(service).toBeTruthy();
  });
});
