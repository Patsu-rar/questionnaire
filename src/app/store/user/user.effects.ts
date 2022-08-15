import {Injectable} from "@angular/core";
import {createEffect} from "@ngrx/effects";
import {Actions, ofType} from "@ngrx/effects";
import {catchError, from, map, of, switchMap} from "rxjs";

import {userActions} from './';
import {AuthService} from "../../shared/services/auth.service";

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private loginService: AuthService
  ) {
  }

  userSignup$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.userSignup),
    switchMap((action) => from(this.loginService.signupUser(action.user))
      .pipe(
        map((user) => {
          return userActions.userSignupSuccess({user});
        }),
        catchError((err, caught) => {
          return of(userActions.userSignupFailure())
        })
      ))
  ))

  userLogin$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.userLogin),
    switchMap((action) => from(this.loginService.loginUser(action.email, action.password))
      .pipe(
        map((user) => {
          return userActions.userLoginSuccess({user});
        }),
        catchError((err, caught) => {
          return of(userActions.userLoginFailure())
        })
      ))
  ))

  userLogout$ = createEffect(() => this.actions$.pipe(
    ofType(userActions.userLogout),
    switchMap(() => from(this.loginService.logout())
      .pipe(
        map(() => userActions.userLogoutSuccess()),
        catchError(() => of(userActions.userLogoutFailure()))
      ))
  ))
}
