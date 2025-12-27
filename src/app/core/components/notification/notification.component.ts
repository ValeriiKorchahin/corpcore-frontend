import { Component, Inject, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef
} from '@angular/material/snack-bar';
import {  MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-notification',
  imports: [
    MatSnackBarLabel,
    MatSnackBarActions,
    MatSnackBarAction,
    MatIcon,
    MatIconButton
  ],
  template: `
    <span matSnackBarLabel>
      {{data.message}}
    </span>
    <span matSnackBarActions>
  <button mat-icon-button matSnackBarAction (click)="snackBarRef.dismissWithAction()">
    <mat-icon>
      close
    </mat-icon>
  </button>
</span>
  `,
  styles: `
    :host {
      display: flex;
    }
  `,
})
export class NotificationComponent {

  public readonly snackBarRef = inject(MatSnackBarRef);

  constructor(
    @Inject(MAT_SNACK_BAR_DATA)
    public data: {
      message: string,
    },
  ) {}
}
