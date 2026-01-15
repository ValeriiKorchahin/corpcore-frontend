import { Routes } from '@angular/router';

export const organizationRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./organization.component').then((x) => x.OrganizationComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'companies',
      },
      {
        path: 'companies',
        loadComponent: () =>
          import('./organization-companies-ngrx/organization-companies-ngrx').then(
            (x) => x.OrganizationCompaniesNgrx
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./organization-user/organization-user.component').then(
            (x) => x.OrganizationUserComponent,
          ),
      },
    ],
  },
];
