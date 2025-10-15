import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog';

@Injectable({ providedIn: 'root' })
export class Dialog {
  private dialog = inject(MatDialog);

  showError(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '350px',
      disableClose: true,
    });
  }
}
