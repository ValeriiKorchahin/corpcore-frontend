import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CompanyService } from '../../services/company.service';
import { userCompaniesActions } from './user-companies-actions';
import { userActions } from '../user/user-actions';
import { exhaustMap } from 'rxjs';

@Injectable()
export class UserCompaniesEffects {
 readonly #$actions = inject(Actions);
 private readonly companiesService = inject(CompanyService);

 $load = createEffect(() =>
   this.#$actions.pipe(
     ofType(userCompaniesActions.load, userActions.authSuccess),
     exhaustMap(() => this.companiesService.getUserCompanies()),
   ).pipe(
     map((companies) => userCompaniesActions.loaded({companies: companies}))
   )
 );
}
