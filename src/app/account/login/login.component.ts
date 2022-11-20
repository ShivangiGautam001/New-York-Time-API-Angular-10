import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';
import { TokenStorageService } from '../../_services/token.service';
import { Store } from '@ngrx/store';
import * as userActions from '../../app-state/actions';
import * as fromRoot from '../../app-state';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  loading = false;
  submitted = false;
  isLoggedIn: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    public tokenStorageService: TokenStorageService,
    private alertService: AlertService,
    private readonly store: Store
  ) {
    this.store.select(fromRoot.userLogin).pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      if (data.isLoadingSuccess && data.result) {
        if (data.user && data.user.access_token) {
          this.tokenStorageService.startRefreshTokenTimer();
        }
        // get return url from query parameters or default to home page
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.store.dispatch(userActions.login({ user: { email: this.form.value.email, password: this.form.value.password } }));

    // this.accountService.login(this.form.value)
    //   .subscribe(data => {
    //       this.isLoggedIn = true;
    //       // get return url from query parameters or default to home page
    //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       this.router.navigateByUrl(returnUrl);
    //     },
    //     error => {
    //       this.alertService.error(error);
    //       this.loading = false;
    //       this.isLoggedIn = false;
    //     });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
