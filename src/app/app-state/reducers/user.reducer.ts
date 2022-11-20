import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../entity';
import * as userActions from '../actions';
import * as storage from '../state/storage';

export interface State {
  user: User;
  result: any;
  isLoading: boolean;
  isLoadingSuccess: boolean;
  isLoadingFailure: boolean;
}

export const initialState: State = {
  user: storage.getItem('user').user,
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const loginReducer = createReducer(
  initialState,
  on(userActions.login, (state, {user}) => ({user, isLoading: true})),
  on(userActions.loginSuccess, (state, action) => {
    console.log('action',action)
    const {access_token, type} = action;
    const _user = { ...state.user };
    _user.access_token = access_token;
    console.log('user',_user)
    localStorage.setItem('user', JSON.stringify(_user));

      return {
        ...state, 
        user: _user, 
        result: type,
        isLoading: false, 
        isLoadingSuccess: true
    }
  }),
  on(userActions.signup, (state, {user}) => ({user, isLoading: true})),
  on(userActions.signupSuccess, (state, result) => ({user: state.user, result, isLoading: false, isLoadingSuccess: true}))
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
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
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
