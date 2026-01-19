import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user-state';

export const selectUserState = createFeatureSelector<IUserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (userState: IUserState) => userState,
);

export const selectLoading = createSelector(
  selectUser,
  (userState: IUserState) => userState.isLoading,
);
