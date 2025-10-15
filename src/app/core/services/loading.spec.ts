import { TestBed } from '@angular/core/testing';
import {LoadingService} from './loading';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });

    service = TestBed.inject(LoadingService);
  });

  it('should initialize with isLoading false', () => {
    expect(service.isLoading()).toBe(false);
  });

  it('should set isLoading to true on show()', () => {
    service.show();
    expect(service.isLoading()).toBe(true);
  });

  it('should set isLoading to false on hide()', () => {
    service.show();
    service.hide();
    expect(service.isLoading()).toBe(false);
  });
});
