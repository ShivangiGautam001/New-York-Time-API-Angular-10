import { createAction, props } from '@ngrx/store';
import { Story } from '../entity';

export const GET_STORIES = '[Story] Get Stories';
export const GET_STORIES_SUCCESS = '[Story] Get Stories Success';
export const GET_STORIES_FAILURE = '[Story] Get Stories Failure';

export const getStories = createAction(
  GET_STORIES,
  props<{ section: string }>()
);

export const getStoriesSuccess = createAction(
  GET_STORIES_SUCCESS,
  props<{ response: any, section: string }>()
);

export const getStoriesFailure = createAction(
  GET_STORIES_FAILURE,
  props<{ any }>()
);
