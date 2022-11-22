import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const accountModule = () => import('./modules/account/account.module').then(x => x.AccountModule);
const dashboardModule = () => import('./modules/dashboard/dashboard.module').then(x => x.DashboardModule);

const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: dashboardModule, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }