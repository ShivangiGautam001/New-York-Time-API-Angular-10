import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { StoriesComponent } from './stories/stories.component';
import { SearchComponent } from './search/search.component';
const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'stories', pathMatch: 'full' },
            { path: 'stories', component: StoriesComponent },
            { path: 'search', component: SearchComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }