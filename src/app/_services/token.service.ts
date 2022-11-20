import { Injectable } from '@angular/core';
const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class TokenStorageService {
  constructor(private http: HttpClient) { }

  // helper methods

  public refreshTokenTimeout;
  // public refreshedToken;

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

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}