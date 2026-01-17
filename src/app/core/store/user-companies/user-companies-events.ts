import { eventGroup } from '@ngrx/signals/events';
import { type } from '@ngrx/signals';
import { IOrganization } from '../../models/IOrganization.interface';

export const userCompaniesEvents = eventGroup({
  source: 'User Companies',
  events: {
    load: type<void>(),
    loaded: type<IOrganization[]>(),
    error: type<string>(),
  }
})
