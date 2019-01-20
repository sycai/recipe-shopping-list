import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>) {}

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((response) => {
        this.store.dispatch(new AuthActions.SignUp());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then((token: string) =>
          this.store.dispatch(new AuthActions.SetToken(token)));
      })
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        this.store.dispatch(new AuthActions.SignIn());
        this.router.navigate(['/']);
        firebase.auth().currentUser.getIdToken().then((token: string) =>
          this.store.dispatch(new AuthActions.SetToken(token)));
      })
      .catch(error => console.log(error));
  }

  logOut() {
    firebase.auth().signOut();
    this.store.dispatch(new AuthActions.LogOut());
  }
}
