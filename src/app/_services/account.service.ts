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
            .pipe(
                map((response) => response)
                // ,
                // catchError(err => {

                //     console.log('catchError err',err);
                //     return of([]);
                // })
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
}