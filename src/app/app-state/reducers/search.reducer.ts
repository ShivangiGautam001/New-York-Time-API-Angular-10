import { Action, createReducer, on } from '@ngrx/store';
import { Story, ISearch } from '../entity';
import * as searchActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
  stories?: ISearch[];
  searchHistory?: any;
  currentStory?: Story;
  search?: string;
  deleteStoryId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  stories: storage.getItem('story').stories,
  searchHistory: [],
  currentStory: {},
  deleteStoryId: '',
  result: '',
  isLoading: false,
  isLoadingSuccess: false,
  isLoadingFailure: false
};

const searchReducer = createReducer(
  initialState,

  // Get Stories
  on(searchActions.getSearchStories, (state) => ({ ...state, isLoading: true })),
  on(searchActions.getSearchStoriesSuccess, (state, result) => {
    let { searchHistory } = state;
    searchHistory = state.searchHistory && state.searchHistory.length ? state.searchHistory : [];
    if (result.searchValue !== '' && searchHistory.indexOf(result.searchValue) < 0) {
      if (searchHistory.length < 5) {
        searchHistory = [result.searchValue, ...searchHistory]
      }
      else {
        searchHistory = searchHistory.filter((member, index) => {
          return index !== searchHistory.length - 1;
        });
        searchHistory = [result.searchValue, ...searchHistory]
      }
    }
    let stories = [];
    if (result.page > 0) {
      stories = state.stories && state.stories.length ? state.stories : [];
    }
    const response = result.response;
    let newStories = response.response && response.response.docs ? response.response.docs : [];
    if (newStories && newStories.length > 0) {
      if (stories.length > 0) {
        stories = [...stories, ...newStories]
      }
      else {
        stories = [...newStories]
      }
    }
    return {
      result: response,
      stories: stories,
      isLoading: false,
      searchHistory: searchHistory,
      isLoadingSuccess: true
    };
  })
);

export function reducer(state: State | undefined, action: Action): any {
  return searchReducer(state, action);
}

export const getSearchStories = (state: State) => {
  return {
    searchHistory: state.searchHistory,
    result: state.result,
    stories: state.stories,
    isLoading: state.isLoading,
    isLoadingSuccess: state.isLoadingSuccess
  };
};
