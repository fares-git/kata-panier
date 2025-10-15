import {HttpEvent, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import { inject } from '@angular/core';
import {finalize, Observable} from 'rxjs';
import {LoadingService} from '../services/loading';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>) => {
  const loadingService: LoadingService = inject(LoadingService);
  loadingService.show();

  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};
