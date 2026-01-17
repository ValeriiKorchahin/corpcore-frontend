import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { userCompaniesEvents } from './user-companies-events';
import { inject } from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { switchMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IOrganization } from '../../models/IOrganization.interface';
import { userEvents } from '../user/user-store-events';
import { orgCompaniesEvents } from '../../components/organization/organization-companies-ngrx/org-companies-events';

const initialState = {
  isLoading: false,
  userCompanies: <IOrganization[]>[]
};

export const userCompaniesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withReducer(
    on(userCompaniesEvents.load, () => ({
      isLoading: true,
    })),
    on(userCompaniesEvents.loaded, ({ payload }) => ({
      isLoading: false,
      userCompanies: payload,
    })),
    on(orgCompaniesEvents.companyAdded, ({ payload }, state) => ({
      userCompanies: [{ id: payload.id, name: payload.name }, ...state.userCompanies]
    })),
    on(orgCompaniesEvents.companyEdited, ({ payload }, state) => ({
      userCompanies: state.userCompanies.map(c => c.id === payload.id ? payload : c)
    }))
  ),
  withEventHandlers(
    (
      store,
        events = inject(Events),
        companiesService = inject(CompanyService)
    ) => ({
      load$: events.on(userCompaniesEvents.load, userEvents.authSuccess).pipe(
        switchMap(() => companiesService.getUserCompanies())
      ).pipe(
        mapResponse({
          next: (res) => {
            return userCompaniesEvents.loaded(res);
          },
          error: (err: HttpErrorResponse) => {}
        })
      )
    }),
  )
)
