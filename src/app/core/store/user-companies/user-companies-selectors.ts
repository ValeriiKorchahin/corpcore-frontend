import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserCompaniesState } from './user-companies-state';

export const selectUserCompaniesState = createFeatureSelector<IUserCompaniesState>('userCompanies');

export const selectUserCompanies = createSelector(
  selectUserCompaniesState,
  (userCompanies: IUserCompaniesState) => userCompanies.companies
);

export const selectLoading = createSelector(
  selectUserCompaniesState,
  (userCompanies: IUserCompaniesState) => userCompanies.isLoading
);
