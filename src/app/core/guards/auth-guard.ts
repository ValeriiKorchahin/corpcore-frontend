import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  const user = userService.user();

  if (user) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
