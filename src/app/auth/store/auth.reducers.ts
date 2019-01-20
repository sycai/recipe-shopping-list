
export interface State {
  token: string;
  authenticated: boolean;
}

const initialState: State = {
  token: null,
  authenticated: false,
};

export function authReducers(state: State = initialState, action) {
  return state;
}
