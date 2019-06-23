import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoadingSpinnerModule} from '../loading-spinner/loading-spinner.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
    declarations: [DashboardComponent],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        FormsModule,
        LoadingSpinnerModule,
        CollapseModule.forRoot(),
        ReactiveFormsModule
    ]
})
export class DashboardModule {
}
