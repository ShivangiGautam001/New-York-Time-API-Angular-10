import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NY_TIMES_API_KEY } from '@app/constants';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  rootURL = '/svc/search/v2/articlesearch.json';

  getSearchStories(searchValue, page) {
    return this.http.get(this.rootURL + `?q=${searchValue}&page=${page}&api-key=${NY_TIMES_API_KEY}`);
  }
}
