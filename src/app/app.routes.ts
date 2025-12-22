import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./core/components/login/login.component')
      .then((x) => x.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./core/components/register/register.component')
      .then((x) => x.RegisterComponent)
  }
];
