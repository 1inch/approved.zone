import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BaseComponent} from './base/base.component';
import {LoadingSpinnerModule} from './loading-spinner/loading-spinner.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NoContentComponent} from './no-content/no-content.component';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
    declarations: [
        AppComponent,
        BaseComponent,
        NoContentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        FontAwesomeModule,
        LoadingSpinnerModule
    ],
    providers: [
        {
            provide: APP_BASE_HREF,
            useValue: '/' + (window.location.pathname.split('/')[1] || '')
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
