import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/components/interceptors/jwt-interceptor';
import { UserService } from './core/services/user.service';
import { firstValueFrom } from 'rxjs';

export async function authInitializer() {
  const userService = inject(UserService);
  try {
   return await firstValueFrom(userService.getCurrentUser())
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    // Expected: user not logged in or token expired
    // App should continue to load and show login page
    return null
  }
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
