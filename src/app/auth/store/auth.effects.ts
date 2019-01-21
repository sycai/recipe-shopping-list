import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private router: Router) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGN_UP),
    map((action: AuthActions.TrySignUp) => action.payload),
    switchMap((authData) =>
      from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
    ),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {type: AuthActions.SIGN_IN},
        {type: AuthActions.SET_TOKEN, payload: token}
      ];
    })
  );

  @Effect()
  authSignin = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGN_IN),
    map((action: AuthActions.TrySignIn) => action.payload),
    switchMap((authData) =>
      from(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password))
    ),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => {
      this.router.navigate(['/']);
      return [
        {type: AuthActions.SIGN_IN},
        {type: AuthActions.SET_TOKEN, payload: token}
      ];
    })
  );
}
