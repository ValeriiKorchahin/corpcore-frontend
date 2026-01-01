import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { noAuthGuard } from './core/guards/no-auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./core/components/login/login.component').then((x) => x.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [noAuthGuard],
    loadComponent: () =>
      import('./core/components/register-stepper/register-stepper.component').then(
        (x) => x.RegisterStepperComponent,
      ),
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./core/components/home/home.component').then((x) => x.HomeComponent),
  },
  {
    path: 'organization',
    canActivate: [authGuard],
    loadChildren: () => import('./core/components/organization/organization.routes')
      .then(x => x.organizationRoutes)
  }
];
