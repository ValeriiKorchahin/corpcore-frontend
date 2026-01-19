import { createReducer, on } from '@ngrx/store';
import { userActions } from './user-actions';
import { initialState } from './user-state';

export const userReducer = createReducer(
  initialState,
  on(userActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userActions.register, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userActions.authSuccess, (state, res) => ({
    ...state,
    user: res,
    isLoading: false,
  })),
  on(userActions.error, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
