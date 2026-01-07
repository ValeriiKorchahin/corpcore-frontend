import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { UserService } from '../services/user.service';
import { NotificationsService } from '../services/notifications.service';
import { catchError } from 'rxjs';

export const jwtExpirationInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtService = inject(JwtService);
  const userService = inject(UserService);
  const notificationService = inject(NotificationsService);
  const token = jwtService.token;


  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && token) {
        userService.logout();
        notificationService.showMessage('Session has expired. Please, log in again.', 'info');
      }
      throw new Error(err.message);
    })
  );
};
