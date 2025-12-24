import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/components/interceptors/jwt-interceptor';
import { UserService } from './core/services/user.service';
import { firstValueFrom } from 'rxjs';

export function authInitializer() {
  const userService = inject(UserService);
  return firstValueFrom(userService.getCurrentUser());
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([
        jwtInterceptor,
      ])
    ),
    provideAppInitializer(authInitializer)
  ],
};
