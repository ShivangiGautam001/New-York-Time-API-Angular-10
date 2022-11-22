import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { StoriesComponent } from './stories.component';
import { Story } from '../../../app-state/entity/story.entity';
import { AlertService, StoriesService } from '@app/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

fdescribe('StoriesComponent', () => {
  let component: StoriesComponent;
  let storiesService: StoriesService;
  let fixture: ComponentFixture<StoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoriesComponent ],
      providers: [
        StoriesService,
        AlertService
      ],
      imports: [HttpClientTestingModule, RouterTestingModule, StoreModule.forRoot({})]
    })
    .compileComponents();
  }));

  beforeEach(inject([StoriesService], s => {
    storiesService = s;
    fixture = TestBed.createComponent(StoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("should call getStories and return list of stories", async(() => {
    const response: Story[] = [];

    spyOn(storiesService, 'getStories').and.returnValue(of(response))

    component.getStoreDispatchEvent();

    fixture.detectChanges();
  
    expect(component.stories).toEqual(response);
  }));
});
