import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as storage from '../app-state/state/storage';
import { environment } from '@environments/environment';
import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        this.userSubject.next(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
        return JSON.parse(localStorage.getItem('user'));
    }

    login(postData) {
        return this.http.post<User>(`${environment.apiUrl}/auth/login`, postData)
            .pipe(
                map((response) => response)
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        this.stopRefreshTokenTimer();
        localStorage.removeItem('user');
        storage.clearStorage();
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/auth/register`, user);
    }

    
  // helper methods

  public refreshTokenTimeout;

  public refreshToken() {
    let user = JSON.parse(localStorage.getItem('user'));
    const postData = {
      email: user.email,
      password: user.password
    }
    return this.http.post<any>(`${environment.apiUrl}/auth/login`, postData)
      .pipe(map((user) => {
        let userData = JSON.parse(localStorage.getItem('user'));
        userData.access_token = user.access_token;
        localStorage.setItem('user', JSON.stringify(userData))
        this.startRefreshTokenTimer();
        return user;
      }));
  }

  public startRefreshTokenTimer() {
    let user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      // parse json object from base64 encoded jwt token
      const jwtToken = JSON.parse(atob(user.access_token.split('.')[1]));
      // set a timeout to refresh the token a minute before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = expires.getTime() - Date.now() - (60 * 1000);
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }
  }

  public stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}