import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import * as AuthActions from './auth.actions';
import { map, switchMap, mergeMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { from } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.TRY_SIGN_UP),
    map((action: AuthActions.TrySignUp) => action.payload),
    switchMap((authData) =>
      from(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password))
    ),
    switchMap(() => from(firebase.auth().currentUser.getIdToken())),
    mergeMap((token: string) => [
      {type: AuthActions.SIGN_UP},
      {type: AuthActions.SET_TOKEN, payload: token}
    ])
  );
}
