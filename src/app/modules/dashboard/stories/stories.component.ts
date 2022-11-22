import { Component, OnInit } from '@angular/core';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as storyActions from '../../../app-state/actions';
import * as fromRoot from '../../../app-state';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import { AlertService } from '@app/services';

interface Category {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})

export class StoriesComponent implements OnInit {

  public stories = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  expandIndex = null;
  categories: Category[] = [
    { value: 'home', viewValue: 'Home' },
    { value: 'world', viewValue: 'World' },
    { value: 'science', viewValue: 'Science' }
  ];
  selectedValue: string = 'home';
  selectedValueText: string = 'Home';
  loading: boolean = false;
  private subscription: Subscription;
  private timer: Observable<any>;

  constructor(private store: Store, private router: Router, public alertService: AlertService) {
  }

  ngOnInit() {
    this.getStoreDispatchEvent();
    this.store.select(fromRoot.getStoriesSuccess)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        if (!data.isLoading && data.isLoadingSuccess) {
          this.stories = data.stories;
          this.subscription = this.timer.subscribe(() => {
            // set showloader to false to hide loading div from view
            this.loading = false;
          });
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });

    this.store.select(fromRoot.getStoriesFailure)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        if (data.isLoadingFailure && data.error) {
          this.loading = false;
          this.alertService.error(data.error);
        }
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  getStoreDispatchEvent() {
    this.store.dispatch(storyActions.getStories({ section: this.selectedValue }));
    this.setTimer();
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
      this.getStoreDispatchEvent();
      let text = this.categories.find(x => x.value == e.value);
      this.selectedValueText = text ? text.viewValue : "";
    }
  }

  navigateToSearch() {
    this.router.navigate(['/dashboard/search'])
  }

  public setTimer() {
    // set loading to true to show loading div on view
    this.loading = true;
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
