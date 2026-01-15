import { IUser } from '../../../models/IUser.interface';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { OrganizationService } from '../../../services/organization.service';
import { NotificationsService } from '../../../services/notifications.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { IPagination } from '../../../models/IPagination.interface';


interface OrgUserState {
  isLoading: boolean;
  filter: string;
  users: IUser[];
  limit: number;
  page: number;
  total: number;
}

const initialState: OrgUserState = {
  isLoading: false,
  filter: '',
  users: [],
  limit: 25,
  page: 1,
  total: 0,
};

export const OrgUserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => {
    const organizationService = inject(OrganizationService);
    const notificationsService = inject(NotificationsService);

    const getUsers$ = rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        debounceTime(600),
        switchMap(() => {
          const { page, limit, filter } = store;
          return organizationService.getOrganizationUsers({ page: page(), limit: limit() }, filter())
            .pipe(
            tapResponse({
              next: (res) => {
                patchState(store, {
                  isLoading: false,
                  users: res.data,
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
              }
            })
          )
        })
      )
    );

    return {
      load: () => getUsers$(),
      filter: rxMethod<string>(
        pipe(
          debounceTime(300),
          distinctUntilChanged(),
          tap((filterString) => {
            patchState(store, {
              filter: filterString,
              page: 1
            });
            getUsers$();
          })
        )
      ),
      changePage(paginationOpts: IPagination) {
        patchState(store, {
          page: paginationOpts.page,
          limit: paginationOpts.limit,
        })
      }
    }
  }),
);
