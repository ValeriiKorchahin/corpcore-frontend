import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../components/notification/notification.component';

type NotificationType = 'success' | 'error' | 'info';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private readonly _matSnackBar = inject(MatSnackBar);

  showMessage(message: string, type: NotificationType) {
    this._matSnackBar.openFromComponent(NotificationComponent, {
      data: {
        type: type,
        message: message,
      },
      duration: 3000,
      panelClass: `${type}-snackbar-container`,
    });
  }
}
