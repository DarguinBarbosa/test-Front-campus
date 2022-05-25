import { TestBed } from '@angular/core/testing';

import { SpinerInterceptor } from './spiner.interceptor';

describe('SpinerInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpinerInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: SpinerInterceptor = TestBed.inject(SpinerInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
