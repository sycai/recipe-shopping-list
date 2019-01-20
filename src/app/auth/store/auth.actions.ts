import { Action} from '@ngrx/store';

export const SIGN_UP = 'SIGN_UP';
export class SignUp implements Action {
  readonly type = SIGN_UP;
}

export const SIGN_IN = 'SIGN_IN';
export class SignIn implements Action {
  readonly type = SIGN_IN;
}

export const LOG_OUT = 'LOG_OUT';
export class LogOut implements Action {
  readonly type = LOG_OUT;
}

export const SET_TOKEN = 'SET_TOKEN';
export class SetToken implements Action {
  readonly type = SET_TOKEN;
  constructor(public payload: string) {}
}

export type AuthActions = SignUp | SignIn | LogOut | SetToken;
