import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { StoriesComponent } from './stories/stories.component';
import { SearchComponent } from './search/search.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        InfiniteScrollModule,
        DashboardRoutingModule
    ],
    declarations: [
        LayoutComponent,
        StoriesComponent,
        SearchComponent
    ]
})
export class DashboardModule { }