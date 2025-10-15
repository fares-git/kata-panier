import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler';
import { Dialog } from './dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpErrorMessage } from '../enums/http-error-message';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;
  let dialogSpy: { showError: jest.Mock };

  beforeEach(() => {
    dialogSpy = { showError: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerService,
        { provide: Dialog, useValue: dialogSpy }
      ]
    });

    service = TestBed.inject(ErrorHandlerService);
  });

  it('should show network error for ErrorEvent', () => {
    const error = new HttpErrorResponse({
      error: new ErrorEvent('Network error', { message: 'Offline' }),
      status: 0
    });

    service.handle(error);

    expect(dialogSpy.showError).toHaveBeenCalledWith(`${HttpErrorMessage.NetworkError} : Offline`);
  });

  it('should show 400 error message', () => {
    const error = new HttpErrorResponse({ status: 400 });
    service.handle(error);
    expect(dialogSpy.showError).toHaveBeenCalledWith(HttpErrorMessage.BadRequest);
  });

  it('should show 401 error message', () => {
    const error = new HttpErrorResponse({ status: 401 });
    service.handle(error);
    expect(dialogSpy.showError).toHaveBeenCalledWith(HttpErrorMessage.Unauthorized);
  });

  it('should show 403 error message', () => {
    const error = new HttpErrorResponse({ status: 403 });
    service.handle(error);
    expect(dialogSpy.showError).toHaveBeenCalledWith(HttpErrorMessage.Forbidden);
  });

  it('should show 404 error message', () => {
    const error = new HttpErrorResponse({ status: 404 });
    service.handle(error);
    expect(dialogSpy.showError).toHaveBeenCalledWith(HttpErrorMessage.NotFound);
  });

  it('should show 500 error message', () => {
    const error = new HttpErrorResponse({ status: 500 });
    service.handle(error);
    expect(dialogSpy.showError).toHaveBeenCalledWith(HttpErrorMessage.InternalServerError);
  });

  it('should show unknown error message for other status', () => {
    const error = new HttpErrorResponse({ status: 999 });
    service.handle(error);
    expect(dialogSpy.showError).toHaveBeenCalledWith(`${HttpErrorMessage.Unknown} (999).`);
  });
});
