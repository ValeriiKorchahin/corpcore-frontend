import { eventGroup } from '@ngrx/signals/events';
import { type } from '@ngrx/signals';
import { IAuthResponse, ILogin, IRegister } from '../../models/ILogin.interface';
import { ICompany } from '../../models/ICompany.interface';

export const userEvents = eventGroup({
  source: 'User',
  events: {
    login: type<ILogin>(),
    register: type<{
      credentials: IRegister,
      company?: ICompany | null,
    }>(),
    registeredWithCompany: type<ICompany>(),
    authSuccess: type<IAuthResponse>(),
    error: type<string>(),
  }
});
