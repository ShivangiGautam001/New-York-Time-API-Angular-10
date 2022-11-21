import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NY_TIMES_API_KEY } from '../_helpers/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private http: HttpClient) { }

  rootURL = '/svc/topstories/v2/';

  getStories(section) {
    return this.http.get(this.rootURL + `${section}.json?api-key=${NY_TIMES_API_KEY}`);
  }
}
