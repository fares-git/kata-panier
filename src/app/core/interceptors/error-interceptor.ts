import {HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import { inject } from '@angular/core';
import {ErrorHandlerService} from '../services/error-handler';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>) => {
  const errorHandler: ErrorHandlerService = inject(ErrorHandlerService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      errorHandler.handle(error);
      return throwError(() => error);
    })
  );
};
