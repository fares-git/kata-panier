import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {Dialog} from './dialog';

import {HttpErrorMessage} from '../enums/http-error-message';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  private dialogService = inject(Dialog);

  handle(error: HttpErrorResponse): void {
    const message = this.getErrorMessage(error);
    this.dialogService.showError(message);
  }

  private getErrorMessage(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `${HttpErrorMessage.NetworkError} : ${error.error.message}`;
    }

    switch (error.status) {
      case 400: return HttpErrorMessage.BadRequest;
      case 401: return HttpErrorMessage.Unauthorized;
      case 403: return HttpErrorMessage.Forbidden;
      case 404: return HttpErrorMessage.NotFound;
      case 500: return HttpErrorMessage.InternalServerError;
      default:  return `${HttpErrorMessage.Unknown} (${error.status}).`;
    }
  }
}
