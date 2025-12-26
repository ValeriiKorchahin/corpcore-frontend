import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const noAuthGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const user = userService.user();

  return !user ? true : false;
};
