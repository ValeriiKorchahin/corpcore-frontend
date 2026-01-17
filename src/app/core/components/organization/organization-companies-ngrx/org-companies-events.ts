import { eventGroup } from '@ngrx/signals/events';
import { type } from '@ngrx/signals';
import { IPaginatedResponse } from '../../../models/IPagination.interface';
import { ICompany } from '../../../models/ICompany.interface';

export const orgCompaniesEvents = eventGroup({
  source: 'Organization Companies',
  events: {
    load: type<void>(),
    loaded: type<
      IPaginatedResponse<ICompany[]>
    >(),
    error: type<string>(),
    filter: type<string>(),
    pageChange: type<{
      page: number;
      limit: number;
    }>(),
    addCompany: type<ICompany>(),
    companyAdded: type<ICompany>(),
    editCompany: type<{
      companyId: string;
      company: ICompany
    }>(),
    companyEdited: type<ICompany>(),
  }
});
