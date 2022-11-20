import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NY_TIMES_API_KEY } from '../_helpers/app.constants';

@Injectable({
  providedIn: 'root'
})
export class StoriesService {

  constructor(private http: HttpClient) { }

  rootURL = 'https://api.nytimes.com/svc/topstories/v2/';

  getStories(section) {
    return this.http.get(this.rootURL + `${section}.json?api-key=${NY_TIMES_API_KEY}`);
  }

  addStory(story: any) {
    return this.http.post(this.rootURL + '/story', { story });
  }

  editStory(story: any) {
    return this.http.put(this.rootURL + '/story', { story });
  }

  deleteStory(storyId: any) {
    return this.http.delete(`${this.rootURL}/story/${storyId}`);
  }
}
