import { ICompany } from '../../../models/ICompany.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { OrganizationService } from '../../../services/organization.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../../../services/notifications.service';
import { IPagination } from '../../../models/IPagination.interface';

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
  withMethods((store) => {
    const organizationService = inject(OrganizationService);
    const notificationsService = inject(NotificationsService);

    const getCompanies$ = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        debounceTime(600),
        switchMap(() => {
          const { page, limit, filter } = store;
          return organizationService
            .getOrganizationCompanies({ page: page(), limit: limit() }, filter())
            .pipe(
              tapResponse({
                next: (res) => {
                  patchState(store, {
                    isLoading: false,
                    companies: res.data,
                    limit: res.limit,
                    page: res.page,
                    total: res.total,
                  });
                },
                error: (err: HttpErrorResponse) => {
                  notificationsService.showMessage(err.error?.error, 'error');
                  patchState(store, {
                    isLoading: false,
                  });
                },
              }),
            );
        }),
      ),
    );

    return {
      load: () => getCompanies$(),
      filter: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap((filterString) => {
            patchState(store, {
              filter: filterString,
              page: 1,
            });
            getCompanies$();
          }),
        ),
      ),
      changePage(paginationOpts: IPagination) {
        patchState(store, {
          page: paginationOpts.page,
          limit: paginationOpts.limit,
        });
        getCompanies$();
      },
    };
  }),
);
