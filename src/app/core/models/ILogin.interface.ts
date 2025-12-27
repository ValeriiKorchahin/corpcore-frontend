import { IUser } from './IUser.interface';
import { IOrganization } from './IOrganization.interface';

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  name: string;
  organizationName: string;
}

export interface IAuthResponse extends IUser {
  organizations: IOrganization[];
  token: string;
}
