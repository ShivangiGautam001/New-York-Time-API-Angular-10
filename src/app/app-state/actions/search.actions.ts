import { createAction, props } from '@ngrx/store';

export const GET_SEARCH_STORIES = '[Search] Get Searched Stories';
export const GET_SEARCH_STORIES_SUCCESS = '[Search] Get Searched Stories Success';
export const GET_SEARCH_STORIES_FAILURE = '[Search] Get Searched Stories Failure';

export const getSearchStories = createAction(
  GET_SEARCH_STORIES,
  props<{ searchValue: string, page: number }>()
);

export const getSearchStoriesSuccess = createAction(
  GET_SEARCH_STORIES_SUCCESS,
  props<{ response: any, searchValue: string, page: number }>()
);

export const getSearchStoriesFailure = createAction(
  GET_SEARCH_STORIES_FAILURE,
  props<{ any }>()
);