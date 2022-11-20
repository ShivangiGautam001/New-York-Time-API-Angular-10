import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { StoriesService } from '../../_services/stories.service';
import * as storyActions from '../actions';

@Injectable()
export class StoryEffects {

  constructor(
    private actions$: Actions,
    private storiesService: StoriesService
  ) { }

  getStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storyActions.getStories),
      exhaustMap(action =>
        this.storiesService.getStories(action.section).pipe(
          map(response => {
            return storyActions.getStoriesSuccess({ response: response, section: action.section })
          }),
          catchError((error: any) => of(storyActions.getStoriesFailure(error))))
      )
    )
  );

  createStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storyActions.createStory),
      exhaustMap(action =>
        this.storiesService.addStory(action.story).pipe(
          map(response => storyActions.createStorySuccess(response)),
          catchError((error: any) => of(storyActions.createStoryFailure(error))))
      )
    )
  );


  deleteStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storyActions.deleteStory),
      exhaustMap(action => this.storiesService.deleteStory(action.storyid).pipe(
        map(response => storyActions.deleteStorySuccess(response)),
        catchError((error: any) => of(storyActions.deleteStoryFailure(error))))
      )
    )
  );

  editStory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storyActions.editStory),
      exhaustMap(action =>
        this.storiesService.editStory(action.story).pipe(
          map(response => storyActions.editStorySuccess(response)),
          catchError((error: any) => of(storyActions.editStoryFailure(error))))
      )
    )
  );

}
