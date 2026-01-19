import { IUser } from '../../models/IUser.interface';

export interface IUserState {
  isLoading: boolean;
  user: IUser | null;
  error: string | null;
}

export const initialState: IUserState = {
  isLoading: false,
  user: null,
  error: ''
};
