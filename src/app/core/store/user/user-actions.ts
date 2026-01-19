import { createActionGroup, props } from '@ngrx/store';
import { IAuthResponse, ILogin, IRegister } from '../../models/ILogin.interface';
import { ICompany } from '../../models/ICompany.interface';

export const userActions = createActionGroup({
  source: 'User',
  events: {
    'Login': props<ILogin>(),
    'Register': props<IRegister>(),
    'Create Company': props<ICompany>(),
    'Auth Success': props<IAuthResponse>(),
    'Error': props<{ error: string }>()
  }
});
