import { signalStore, withState } from '@ngrx/signals';
import { IUser } from '../../models/IUser.interface';
import { Dispatcher, Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { userEvents } from './user-store-events';
import { inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { switchMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { orgCompaniesEvents } from '../../components/organization/organization-companies-ngrx/org-companies-events';
import { CompanyService } from '../../services/company.service';

const initialState: {
  user: IUser | null;
  isLoading: boolean;
} = {
  user: null,
  isLoading: false,
};

export const userStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withReducer(
    on(userEvents.login, () => ({
      isLoading: true,
    })),
    on(userEvents.register, () => ({
      isLoading: true,
    })),
    on(userEvents.authSuccess, ({ payload }) => ({
      isLoading: false,
      user: {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.organizations[0].role,
      },
    })),
    on(userEvents.error, () => ({
      isLoading: false,
    }))
  ),
  withEventHandlers(
    (
    store,
    events = inject(Events),
    dispatcher = inject(Dispatcher),
    userService = inject(UserService),
    companyService = inject(CompanyService)
  ) => ({
      login$: events.on(userEvents.login).pipe(
        switchMap(({ payload }) =>
          userService.login(payload)),
      ).pipe(
        mapResponse({
          next: (res) => dispatcher.dispatch(userEvents.authSuccess(res)),
          error: (err: HttpErrorResponse) => userEvents.error(err.message)
        }),
      ),
      register$: events.on(userEvents.register).pipe(
        switchMap(({ payload }) =>
          userService.register(payload.credentials).pipe(
            mapResponse({
              next: (res) => {
                if (payload.company) {
                  dispatcher.dispatch(userEvents.registeredWithCompany(payload.company));
                }
                dispatcher.dispatch(userEvents.authSuccess(res));
              },
              error: (err: HttpErrorResponse) => userEvents.error(err.message)
            })
          ),
        ),
      ),
      createCompany$: events.on(userEvents.registeredWithCompany).pipe(
        switchMap(({ payload }) => companyService.create(payload)),
        mapResponse({
          next: (res) => {
            dispatcher.dispatch(orgCompaniesEvents.companyAdded(res));
          },
          error: (err: HttpErrorResponse) => userEvents.error(err.message)
        })
      )
    })
  ),
);
