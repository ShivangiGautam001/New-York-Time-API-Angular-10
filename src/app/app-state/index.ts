import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import * as fromUser from './reducers/user.reducer';
import * as fromSearch from './reducers/search.reducer';
import * as fromStory from './reducers/story.reducer';

export interface State {
  user: fromUser.State;
  story: fromStory.State;
  search: fromSearch.State;
}

export const reducers: ActionReducerMap<State> = {
  user: fromUser.reducer,
  story: fromStory.reducer,
  search: fromSearch.reducer
};

const reducerKeys = ['user', 'story', 'search'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({ keys: reducerKeys })(reducer);
}

// console.log all actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    return reducer(state, action);
  };
}


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const getLoginState = createFeatureSelector<fromUser.State>('user');

export const getLoggedInUser = createSelector(
  getLoginState,
  fromUser.getLoggedInUser
);

export const userLogin = createSelector(
  getLoginState,
  fromUser.userLogin
);

export const userSignup = createSelector(
  getLoginState,
  fromUser.userSignup
);


// story reducers Begin

export const getStoryState = createFeatureSelector<fromStory.State>('story');

export const getStories = createSelector(
  getStoryState,
  fromStory.getStories
);
export const getStoriesSuccess = createSelector(
  getStoryState,
  fromStory.getStoriesSuccess
);
export const getStoriesFailure = createSelector(
  getStoryState,
  fromStory.getStoriesFailure
);
// search story reducers Begin

export const getSearchStoryState = createFeatureSelector<fromSearch.State>('search');

export const getSearchStories = createSelector(
  getSearchStoryState,
  fromSearch.getSearchStories
);
export const getSearchStoriesFailure = createSelector(
  getSearchStoryState,
  fromSearch.getSearchStoriesFailure
);
