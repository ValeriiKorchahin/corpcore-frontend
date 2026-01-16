import { ICompany } from '../../../models/ICompany.interface';
import { signalStore, withState } from '@ngrx/signals';
import { Events, on, withEventHandlers, withReducer } from '@ngrx/signals/events';
import { inject } from '@angular/core';
import { CompanyService } from '../../../services/company.service';
import { debounceTime, distinctUntilChanged, merge, switchMap } from 'rxjs';
import { mapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationsService } from '../../../services/notifications.service';
import { orgCompaniesEvents } from './org-companies-events';

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

export const OrgCompaniesEventStore = signalStore(
  {providedIn: 'root'},
  withState(initialState),
  withReducer(
    on(orgCompaniesEvents.load, () => ({
      isLoading: true
    })),
    on(orgCompaniesEvents.loaded,  ({ payload }) => ({
      companies: payload.data,
      limit: payload.limit,
      page: payload.page,
      total: payload.total,
      isLoading: false
    })),
    on(orgCompaniesEvents.filter, ({ payload }) => ({
      isLoading: true,
      filter: payload,
      page: 1
    })),
    on(orgCompaniesEvents.pageChange, ({ payload }) => ({
      isLoading: true,
      limit: payload.limit,
      page: payload.page
    })),
    on(orgCompaniesEvents.error, () => ({
      isLoading: false,
    })),
    on(orgCompaniesEvents.addCompany, () => ({
      isLoading: true,
    })),
    on(orgCompaniesEvents.companyAdded, ({ payload }, state) => ({
      ...state,
      isLoading: false,
      companies: [payload, ...state.companies],
      total: state.total + 1,
    })),
    on(orgCompaniesEvents.editCompany, () => ({
      isLoading: true,
    })),
    on(orgCompaniesEvents.companyEdited, ({ payload }, state) => ({
      isLoading: false,
      companies: state.companies.map(c => c.id === payload.id ? payload : c),
    }))
  ),
    withEventHandlers(
      (
      store,
      events = inject(Events),
      companiesService = inject(CompanyService),
      notificationsService = inject(NotificationsService)
    ) => ({
        load$: merge(
          events.on(orgCompaniesEvents.loaded, orgCompaniesEvents.pageChange),
          events.on(orgCompaniesEvents.filter).pipe(
            debounceTime(500),
            distinctUntilChanged(),
          )
        ).pipe(
            switchMap(() => companiesService.getOrganizationCompanies(
                {
                  limit: store.limit(),
                  page: store.page(),
                },
                store.filter()
              ).pipe(
                mapResponse({
                  next: (res) => orgCompaniesEvents.loaded(res),
                  error: (err: HttpErrorResponse) => {
                    notificationsService.showMessage(err.error?.error, 'error');
                    return orgCompaniesEvents.error(err.error.message);
                  }
                })
              )
            )
          ),
        add$: events.on(orgCompaniesEvents.addCompany).pipe(
          switchMap(
            ({ payload }) =>
            companiesService.create(payload))
        ).pipe(
          mapResponse({
            next: (res) => {
              notificationsService.showMessage('Company added successfully!', 'success');
              return orgCompaniesEvents.companyAdded(res);
            },
            error: (err: HttpErrorResponse) => {
              notificationsService.showMessage(err.error?.error, 'error');
              return orgCompaniesEvents.error(err.error.message);
            }
          })
        ),
        edit$: events.on(orgCompaniesEvents.editCompany).pipe(
          switchMap(({ payload }) => companiesService.edit(payload.companyId, payload.company))
        ).pipe(
          mapResponse({
            next: (res) => {
              notificationsService.showMessage('Company edited successfully!', 'success');
              return orgCompaniesEvents.companyEdited(res)
            },
            error: (err: HttpErrorResponse) => {
              notificationsService.showMessage(err.error?.error, 'error');
              return orgCompaniesEvents.error(err.error.message);
            }
          })
        )
      })
    )
);
