import * as AuthActions from './auth.actions';
import * as firebase from 'firebase';

export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false,
};

export function authReducers(state: State = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.SIGN_UP:
    case AuthActions.SIGN_IN:
      return {
        ...state,
        authenticated: true
      };

    case AuthActions.LOG_OUT:
      firebase.auth().signOut();
      return {
        ...state,
        token: null,
        authenticated: false
      };

    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };

    default:
      return state;
  }
}
