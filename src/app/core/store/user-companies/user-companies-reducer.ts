import { createReducer, on } from '@ngrx/store';
import { initialState, IUserCompaniesState } from './user-companies-state';
import { userCompaniesActions } from './user-companies-actions';
import { companyAddedAction, companyEditedAction } from '../global/global-actions';
import { IOrganization } from '../../models/IOrganization.interface';

export const userCompaniesReducer = createReducer<IUserCompaniesState>(
  initialState,
  on(userCompaniesActions.load(), (state) => ({
    ...state,
    isLoading: true,
  })),
  on(userCompaniesActions.loaded(), (state, res) => ({
    ...state,
    companies: res,
    isLoading: false,
  })),
  on(companyAddedAction, (state, payload) => {
    const company: IOrganization = { name: payload.name, id: payload.id };

  }),
  on(companyEditedAction, (state, payload) => {
    ...state,
    companies: state.companies.map(c => c.id === payload.id ? payload : c)
  })
)
