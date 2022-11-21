import { Component, OnInit } from '@angular/core';
import { AlertService } from '@app/_services';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as actions from '../../../app-state/actions';
import * as fromRoot from '../../../app-state';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  public img_url = 'https://static01.nyt.com/';
  public stories = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  panelOpenState = false;
  step = -1;
  expandIndex = null;
  categories: Category[] = [
    { value: 'world', viewValue: 'World' },
    { value: 'science', viewValue: 'Science' }
  ];
  searchedValue: string = '';
  selectedValueText: string = '';
  page = 0;
  throttle = 300;
  scrollDistance = 0;
  scrollUpDistance = 2;
  direction = "";
  scrolled: boolean = false;
  searchHistory: string[] = [];
  loading: boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;
  constructor(private store: Store, private alertService: AlertService) {
  }

  ngOnInit() {
    this.dispatchGetArticle();
    // this.store.dispatch(storyActions.getStories({ section: this.searchedValue }));
    this.store.select(fromRoot.getSearchStories)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        this.stories = data.stories;
        this.searchHistory = data.searchHistory;
        this.subscription = this.timer.subscribe(() => {
          // set scrolled to false to hide loading div from view
          this.scrolled = false;
        });
      }, error => {
        this.scrolled = false;
      });
  }
  setStep(index: number) {
    this.step = index;
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

  categoryChangeEvent(e) {
    this.expandIndex = null;
    if (e && e.value) {
      // this.store.dispatch(storyActions.getStories({ section: e.value }));
      let text = this.categories.find(x => x.value == e.value);
      this.selectedValueText = text ? text.viewValue : "";
    }
  }

  searchArticles(value) {
    this.searchedValue = value ? value : '';
    this.page = 0;
    this.scrolled = false;
    this.dispatchGetArticle();
  }

  dispatchGetArticle() {
    this.store.dispatch(actions.getSearchStories({ searchValue: this.searchedValue, page: this.page }));
    this.setTimer();
  }

  onScrollDown(ev) {
    this.page = Number(this.page) + 1;
    this.dispatchGetArticle();
  }

  public setTimer() {
    // set scrolled to true to show loading div on view
    this.scrolled = true;
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
