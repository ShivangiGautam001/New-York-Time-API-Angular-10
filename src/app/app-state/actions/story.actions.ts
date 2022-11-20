import { createAction, props } from '@ngrx/store';
import { Story } from '../entity';

export const GET_STORIES = '[Story] Get Stories';
export const GET_STORIES_SUCCESS = '[Story] Get Stories Success';
export const GET_STORIES_FAILURE = '[Story] Get Stories Failure';

export const CREATE_STORY = '[Story] Create Story';
export const CREATE_STORY_SUCCESS = '[Story] Create Story Success';
export const CREATE_STORY_FAILURE = '[Story] Create Story Failure';

export const DELETE_STORY = '[Story] Delete Story';
export const DELETE_STORY_SUCCESS = '[Story] Delete Story Success';
export const DELETE_STORY_FAILURE = '[Story] Delete Story Failure';

export const EDIT_STORY = '[Story] Edit Story';
export const EDIT_STORY_SUCCESS = '[Story] Edit Story Success';
export const EDIT_STORY_FAILURE = '[Story] Edit Story Failure';


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

export const createStory = createAction(
  CREATE_STORY,
  props<{ story: any }>()
);

export const createStorySuccess = createAction(
  CREATE_STORY_SUCCESS,
  props<any>()
);

export const createStoryFailure = createAction(
  CREATE_STORY_FAILURE,
  props<{ any }>()
);

export const deleteStory = createAction(
  DELETE_STORY,
  props<{ storyid }>()
);

export const deleteStorySuccess = createAction(
  DELETE_STORY_SUCCESS,
  props<any>()
);

export const deleteStoryFailure = createAction(
  DELETE_STORY_FAILURE,
  props<{ any }>()
);

export const editStory = createAction(
  EDIT_STORY,
  props<{ story: any }>()
);

export const editStorySuccess = createAction(
  EDIT_STORY_SUCCESS,
  props<any>()
);

export const editStoryFailure = createAction(
  EDIT_STORY_FAILURE,
  props<{ any }>()
);
