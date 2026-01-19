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
import { provideStore } from '@ngrx/store';
import { userReducer } from './core/store/user/user-reducer';
import { provideEffects } from '@ngrx/effects';
import { UserEffects } from './core/store/user/user-effects';
import { UserCompaniesEffects } from './core/store/user-companies/user-companies-effects';
import { userCompaniesReducer } from './core/store/user-companies/user-companies-reducer';

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
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor, jwtExpirationInterceptor])),
    provideAppInitializer(authInitializer),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideStore({
      user: userReducer,
      userCompanies: userCompaniesReducer
    }),
    provideEffects([
      UserEffects,
      UserCompaniesEffects
    ])
],
};
