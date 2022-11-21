import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { SearchService } from '../../_services/search.service';
import * as searchActions from '../actions';

@Injectable()
export class SearchEffects {

  constructor(
    private actions$: Actions,
    private searchService: SearchService
  ) { }

  getStories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchActions.getSearchStories),
      exhaustMap(action =>
        this.searchService.getSearchStories(action.searchValue, action.page).pipe(
          map(response => {
            return searchActions.getSearchStoriesSuccess({ response: response, searchValue: action.searchValue, page: action.page })
          }),
          catchError((error: any) => of(searchActions.getSearchStoriesFailure(error))))
      )
    )
  );
}
