import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log(state);
  const url = route.url;

  if (url) {
    return true;
  }
  return true;
};
