import { Component, OnInit } from '@angular/core';
import { takeUntil, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as storyActions from '../../app-state/actions';
import * as fromRoot from '../../app-state';
import { Subject } from 'rxjs';

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
  panelOpenState = false;
  step = -1;
  expandIndex = null;
  categories: Category[] = [
    { value: 'world', viewValue: 'World' },
    { value: 'science', viewValue: 'Science' }
  ];
  selectedValue: string = 'world';
  selectedValueText: string = 'World';
  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(storyActions.getStories({ section: this.selectedValue }));
    this.store.select(fromRoot.getStories)
      .pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        console.log('data+++++++++++++++++++++++++++++++', data)
        this.stories = data.stories;
      }, error => {
        console.log('error', error)
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
      this.store.dispatch(storyActions.getStories({ section: e.value }));
      let text = this.categories.find(x => x.value == e.value);
      this.selectedValueText = text ? text.viewValue : "";
    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
