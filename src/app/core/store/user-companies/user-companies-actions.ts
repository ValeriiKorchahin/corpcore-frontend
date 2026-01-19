import { createActionGroup, props } from '@ngrx/store';
import { IOrganization } from '../../models/IOrganization.interface';

export const userCompaniesActions = createActionGroup({
  source: 'User Companies',
  events: {
    load: props<>,
    loaded: props<{ companies: IOrganization[] }>,
    error: props<{ error: string }>,
  }
});
