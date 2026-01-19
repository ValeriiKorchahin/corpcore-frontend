import { IOrganization } from '../../models/IOrganization.interface';

export interface IUserCompaniesState {
  isLoading: boolean;
  companies: IOrganization[];
}

export const initialState: IUserCompaniesState = {
  isLoading: false,
  companies: []
};
