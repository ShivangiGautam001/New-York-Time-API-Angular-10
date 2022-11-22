import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { ISearch } from '../../../app-state/entity/search.entity';
import { AlertService, SearchService } from '@app/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StoreModule } from '@ngrx/store';

fdescribe('SearchComponent', () => {
  let component: SearchComponent;
  let searchService: SearchService;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      providers: [
        SearchService,
        AlertService
      ],
      imports: [HttpClientTestingModule, MatAutocompleteModule, StoreModule.forRoot({})]
    })
    .compileComponents();
  }));

  beforeEach(inject([SearchService], s => {
    searchService = s;
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));


  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it("should call getSearchStories and return list of stories", async(() => {
    const response: ISearch[] = [];

    spyOn(searchService, 'getSearchStories').and.returnValue(of(response))

    component.dispatchGetArticle();

    fixture.detectChanges();
  
    expect(component.stories).toEqual(response);
  }));
});
