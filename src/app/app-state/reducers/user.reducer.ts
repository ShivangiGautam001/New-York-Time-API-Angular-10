import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../entity';
import * as userActions from '../actions';
import * as storage from '../state/storage';

export interface State {
  user: User;
  result: any;
  error: any;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
}

export const initialState: State = {
  user: storage.getItem('user').user,
  result: '',
  error: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const loginReducer = createReducer(
  initialState,
  on(userActions.login, (state, { user }) => ({ user, isLoading: true })),
  on(userActions.loginSuccess, (state, action) => {
    const { access_token, type } = action;
    const _user = { ...state.user };
    _user.access_token = access_token;
    localStorage.setItem('user', JSON.stringify(_user));
    return {
      ...state,
      user: _user,
      result: type,
      error: '',
      isLoading: false,
      isLoadingSuccess: true,
      isLoadingFailure: false
    }
  }),
  on(userActions.loginFailure, (state, action) => {
    const { message, type } = action;
    const _user = { ...state.user };
    return {
      ...state,
      user: _user,
      result: type,
      error : message,
      isLoading: false,
      isLoadingFailure: true,
      isLoadingSuccess: false
    }
  }),
  on(userActions.signup, (state, { user }) => ({ user, isLoading: true })),
  on(userActions.signupSuccess, (state, result) => ({ user: state.user, result, isLoading: false, isLoadingSuccess: true }))
);

export function reducer(state: State | undefined, action: Action): any {
  return loginReducer(state, action);
}

export const getLoggedInUser = (state: State) => {
  return {
    user: state.user,
    isLoadingSuccess: state.isLoadingSuccess
  }
};

export const userLogin = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    error: state.error,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess,
    isLoadingFailure: state.isLoadingFailure
  }
};

export const userSignup = (state: State) => {
  return {
    user: state.user,
    result: state.result,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  }
};
