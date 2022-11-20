import { Action, createReducer, on } from '@ngrx/store';
import { Story } from '../entity';
import * as storyActions from '../actions';
import * as _ from 'lodash'
import * as storage from '../state/storage';

export interface State {
  stories?: Story[];
  currentStory?: Story;
  deleteStoryId?: any;
  result?: any;
  isLoading?: boolean;
  isLoadingSuccess?: boolean;
  isLoadingFailure?: boolean;
}

export const initialState: State = {
  stories: storage.getItem('story').stories,
  currentStory: {},
  deleteStoryId: '',
  result: '',
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
    let filteredData = response.results.filter(item => item.section && item.section.toLowerCase() === result.section);
    if (filteredData) {
      stories = [...filteredData];
    }
    else {
      stories = [];
    }
    return {
      result: result.response,
      stories: stories,
      isLoading: false,
      isLoadingSuccess: true
    };
  })
  // ({result: result.response, isLoading: false, isLoadingSuccess: true})),

  // // Create Story Reducers
  // on(storyActions.createStory, (state, {story}) => ({...state, isLoading: true, currentStory: story})),
  // on(storyActions.createStorySuccess, (state, result) => {
  //   const stories = undefined !== state.stories ? _.cloneDeep(state.stories) : [];
  //   const currentStory = undefined !== state.currentStory ? _.cloneDeep(state.currentStory) : {};
  //   currentStory. = result.storyId;
  //   stories.push(currentStory);
  //   return {
  //     stories,
  //     isLoading: false,
  //     isLoadingSuccess: true
  //   };
  // }),

  // Delete Story Reducers
  // on(storyActions.deleteStory, (state, {storyid}) => ({...state, isLoading: true, deleteStoryId: storyid})),
  // on(storyActions.deleteStorySuccess, (state, result) => {
  //   let stories = undefined !== state.stories ? _.cloneDeep(state.stories) : [];
  //   if (result.status) {
  //     stories = stories.filter(story => story.id !== state.deleteStoryId);
  //   }
  //   return {
  //     stories,
  //     isLoading: false,
  //     isLoadingSuccess: true
  //   };
  // }),

  // Edit Story Reducers
  //  on(storyActions.editStory, (state, {story}) => ({...state, isLoading: true, currentStory: story})),
  //  on(storyActions.editStorySuccess, (state, result) => {
  //   let stories = undefined !== state.stories ? _.cloneDeep(state.stories) : [];
  //   const currentStory = undefined !== state.currentStory ? _.cloneDeep(state.currentStory) : {};
  //   stories = stories.map(tsk => {
  //     if (tsk.id === currentStory.id) {
  //       tsk = currentStory;
  //     }
  //     return tsk;
  //   });
  //   return {
  //     stories,
  //     isLoading: false,
  //     isLoadingSuccess: true
  //   };
  // })
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
