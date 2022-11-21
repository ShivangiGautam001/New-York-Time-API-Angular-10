import { Action, createReducer, on } from '@ngrx/store';
import { Story } from '../entity';
import * as storyActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
  stories?: Story[];
  result?: any;
  error?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  stories: storage.getItem('story').stories,
  result: '',
  error: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const storyReducer = createReducer(
  initialState,

  // Get Stories
  on(storyActions.getStories, (state) => ({ ...state, isLoading: true })),
  on(storyActions.getStoriesSuccess, (state, result) => {
    let stories: Story[] = [];
    const response = result.response;
    if(result.section == 'home') {
      stories = [...response.results];
    }
    else{
      let filteredData = response.results.filter(item => item.section && item.section.toLowerCase() === result.section);
      if (filteredData) {
        stories = [...filteredData];
      }
      else {
        stories = [];
      }
    }
    return {
      result: result.response,
      stories: stories,
      error: '',
      isLoading: false,
      isLoadingSuccess: true,
      isLoadingFailure: false,
    };
  }),
  on(storyActions.getStoriesFailure, (state, result) => {
    const { message, type } = result;
    return {
      result: result,
      error: message,
      isLoading: false,
      isLoadingFailure: true,
      isLoadingSuccess: false,
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return storyReducer(state, action);
}

export const getStories = (state: State) => {
  return {
    result: state.result,
    stories: state.stories,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
export const getStoriesSuccess = (state: State) => {
  return {
    result: state.result,
    stories: state.stories,
    isLoading: state.isLoading,
    error: state.error,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
export const getStoriesFailure = (state: State) => {
  return {
    error: state.error,
    isLoadingFailure: state.isLoadingFailure
  };
};
