import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule} from '@angular/forms';
import {LoadingSpinnerModule} from '../loading-spinner/loading-spinner.module';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        LoadingSpinnerModule
    ]
})
export class DashboardModule {
}
