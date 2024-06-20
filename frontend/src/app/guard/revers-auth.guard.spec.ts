import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { reversAuthGuard } from './revers-auth.guard';

describe('reversAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => reversAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
