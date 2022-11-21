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
}
