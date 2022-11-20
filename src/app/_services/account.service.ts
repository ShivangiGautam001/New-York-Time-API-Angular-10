import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as storage from '../app-state/state/storage';
import { environment } from '@environments/environment';
import { User } from '../../app/_models';
import { TokenStorageService } from '../_services/token.service';
@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient,
        private tokenStorageService: TokenStorageService
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
            // .pipe(map(data => {
            //     // store user details and jwt token in local storage to keep user logged in between page refreshes
            //     // localStorage.setItem('user', JSON.stringify(user));
            //     // this.userSubject.next(user);

            //     let userData : User = postData;
            //     userData.access_token = data.access_token;
            //       // this.tokenStorage.saveToken(data.accessToken);
            //       // this.tokenStorage.saveUser(data);
            // // store user details and jwt token in local storage to keep user logged in between page refreshes
            // localStorage.setItem('user', JSON.stringify(userData));
            // this.userSubject.next(userData);
            //     return data;
            // }));

            .pipe(
                map((response) => response),
                catchError(err => {
                    console.log(err);
                    return of([]);
                })
            );
    }

    logout() {
        // remove user from local storage and set current user to null
        this.tokenStorageService.stopRefreshTokenTimer();
        localStorage.removeItem('user');
        storage.clearStorage();
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/auth/register`, user);
    }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    update(id, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }

    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.userValue.id) {
                    this.logout();
                }
                return x;
            }));
    }
}