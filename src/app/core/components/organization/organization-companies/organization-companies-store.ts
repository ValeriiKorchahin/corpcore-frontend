import { ICompany } from '../../../models/ICompany.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, of, pipe, switchMap, tap } from 'rxjs';
import { OrganizationService } from '../../../services/organization.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../../../services/notifications.service';

type OrgCompaniesState = {
  isLoading: boolean;
  filter: string;
  companies: ICompany[];
  limit: number;
  page: number;
  total: number;
};

const initialState: OrgCompaniesState = {
  isLoading: false,
  filter: '',
  companies: [],
  limit: 25,
  page: 1,
  total: 0,
};

export const OrgCompaniesStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, service = inject(OrganizationService)) => ({
    load: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          const { page, limit, filter } = store;
          const notificationsService = inject(NotificationsService);
          return service.getOrganizationCompanies({ page: page(), limit: limit() }, filter()).pipe(
            tapResponse({
              next: (res) => {
                patchState(store, {
                  isLoading: false,
                  companies: res.data,
                  limit: res.limit,
                  page: res.page,
                  total: res.total
                });
              },
              error: (err: HttpErrorResponse) => {
                notificationsService.showMessage(err.error?.error, 'error');
                patchState(store, {
                  isLoading: false,
                });
              }
            })
          );
        })
      )
    ),
    filter: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((filterValue) => {
          patchState(store, {
            filter: filterValue,
            page: 1
          });
          // TODO: Implement proper logic and reuse it for fetching data
          return of(filterValue);
        })
      )
    )
  })
  )
)


