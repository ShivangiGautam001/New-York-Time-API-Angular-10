import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { AccountService } from '@app/services';
import * as userActions from '../actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private accountService: AccountService
  ) {}

  userLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.login),
      exhaustMap(action =>
        this.accountService.login(action.user).pipe(
          map(response => {
            return userActions.loginSuccess(response)
          }),
          catchError((error: any) => {
            return of(userActions.loginFailure({message: error}))
          }))
      )
    )
  );

  userSignup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userActions.signup),
      exhaustMap(action =>
        this.accountService.register(action.user).pipe(
          map(response => userActions.signupSuccess(response)),
          catchError((error: any) => of(userActions.signupFailure(error))))
      )
    )
  );

}
