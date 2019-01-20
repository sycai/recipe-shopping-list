import * as AuthActions from './auth.actions';

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
