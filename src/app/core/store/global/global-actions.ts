import { createAction, props } from '@ngrx/store';
import { ICompany } from '../../models/ICompany.interface';

export const companyAddedAction = createAction('Company Added', props<ICompany>);
export const companyEditedAction = createAction('Company Edited', props<ICompany>);
