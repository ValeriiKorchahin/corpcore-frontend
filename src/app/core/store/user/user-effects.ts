import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import { userActions } from './user-actions';
import { exhaustMap, map } from 'rxjs';

@Injectable()

export class UserEffects {
  readonly #actions$ = inject(Actions);
  private readonly userService = inject(UserService);

  login$ = createEffect(() =>
    this.#actions$.pipe(
      ofType(userActions.login),
      exhaustMap(({ password, email }) =>
        this.userService.login({ password, email }))
    ).pipe(
      map((res) => userActions.authSuccess(res))
    ));

  register$ = createEffect(() =>
  this.#actions$.pipe(
    ofType(userActions.register),
    exhaustMap(({name, organizationName, password, email}) =>
      this.userService.register({name, organizationName, password, email  }))
  ).pipe(
    map((res) => userActions.authSuccess(res))
  ));
}
