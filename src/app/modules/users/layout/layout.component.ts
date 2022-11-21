import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../_models';
import { AccountService } from '@app/_services';
@Component({
  selector: 'app-layout-article',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  user: User;
  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.accountService.userValue) {
      this.router.navigate(['/']);
    }
    this.accountService.user.subscribe(x => this.user = x); 
  }

  ngOnInit(): void {
  }

  logout() {
    this.accountService.logout();
}
}