import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/services';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as actions from '../../../app-state/actions';
import * as fromRoot from '../../../app-state';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  public img_url = 'https://static01.nyt.com/';
  public stories = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  expandIndex = null;
  searchedValue: string = '';
  selectedValueText: string = '';
  page = 0;
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  scrolled: boolean = false;
  loading: boolean = true;
  searchHistory: string[] = [];
  private subscription: Subscription;
  private timer: Observable<any>;
  constructor(private store: Store, private alertService: AlertService) {
  }

  ngOnInit() {
    this.dispatchGetArticle();
    this.store.select(fromRoot.getSearchStories)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        if (!data.isLoading && data.isLoadingSuccess) {
          this.stories = data.stories;
          this.searchHistory = data.searchHistory;
          this.subscription = this.timer.subscribe(() => {
            // set scrolled to false to hide loading div from view
            this.scrolled = false;
            this.loading = false;
          });
        }
      }, error => {
        this.scrolled = false;
        this.loading = false;
      });

    this.store.select(fromRoot.getSearchStoriesFailure)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        if (data.error && data.isLoadingFailure) {
          this.scrolled = false;
          this.alertService.error(data.error);
        }
      }, error => {
        this.alertService.error(error);
        this.scrolled = false;
      });
  }

  showHideDetails(i) {
    if (this.stories[i].abstract !== '' || (this.stories[i].multimedia && this.stories[i].multimedia.length > 0)) {
      if (i == this.expandIndex) {
        this.expandIndex = null;
      }
      else {
        this.expandIndex = i;
      }
    }
  }

  searchArticles(value) {
    this.searchedValue = value ? value : '';
    this.page = 0;
    this.scrolled = false;
    this.loading = true;
    this.dispatchGetArticle();
  }

  dispatchGetArticle() {
    this.store.dispatch(actions.getSearchStories({ searchValue: this.searchedValue, page: this.page }));
    this.setTimer();
  }

  onScrollDown(ev) {
    this.loading = false;
    this.page = Number(this.page) + 1;
    this.dispatchGetArticle();
  }

  public setTimer() {
    // set scrolled to true to show loading div on view
    this.scrolled = this.loading ? false : true;
    this.timer = Observable.timer(500);
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    if (this.subscription && this.subscription instanceof Subscription) {
      this.subscription.unsubscribe();
    }
  }
}
