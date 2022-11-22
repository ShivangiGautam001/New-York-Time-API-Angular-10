import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
// ngrx related imports
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './app-state';
import { UserEffects, StoryEffects, SearchEffects } from './app-state/effects';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from '@app/interceptor';
import { AppComponent } from './app.component';
import { AlertComponent } from '@app/components';

@NgModule({
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MaterialModule,
        InfiniteScrollModule,
        // ngrx related imports
        StoreModule.forRoot(reducers, {
            metaReducers
        }),
        EffectsModule.forRoot([UserEffects, StoryEffects, SearchEffects])
    ],
    declarations: [
        AppComponent,
        AlertComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };