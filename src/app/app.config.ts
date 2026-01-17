import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners, isDevMode, provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './core/interceptors/jwt-interceptor';
import { UserService } from './core/services/user.service';
import { firstValueFrom } from 'rxjs';
import { jwtExpirationInterceptor } from './core/interceptors/jwt-expiration-interceptor';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userCompaniesStore } from './core/store/user-companies/user-companies-store';

export async function authInitializer() {
  const userService = inject(UserService);
  try {
    return await firstValueFrom(userService.getCurrentUser());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err: unknown) {
    // Expected: user not logged in or token expired
    // App should continue to load and show login page
    return null;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    userCompaniesStore,
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, jwtExpirationInterceptor])),
    provideAppInitializer(authInitializer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
],
};
