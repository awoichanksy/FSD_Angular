import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {
  MatDialogModule,
  MatInputModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpErrorHandler} from './http-error-handler.service';
import {MyMessageService} from './my-message.service';
import {UnifiedTableComponent} from './unified-table/unified-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {IssuesComponent} from './issues/issues.component';
import {DevicesComponent} from './devices/devices.component';
import {SolversComponent} from './solvers/solvers.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {DialogComponent} from './dialog/dialog.component';
import {DialogSimpleComponent} from './dialog-simple/dialog-simple.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {DynamicFormComponent} from './unified-form/dynamic-form.component';
import {SimulatorComponent} from './simulator/simulator.component';

import {ChartsModule} from 'ng2-charts';
import {StatisticsDashboardComponent} from './statistics/statistics-dashboard.component';
import {StatisticTemplateComponent} from './statistics/statistic-template/statistic-template.component';
import {PieChartComponent} from './statistics/pie-chart/pie-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    UnifiedTableComponent,
    DevicesComponent,
    SolversComponent,
    DialogComponent,
    DialogSimpleComponent,
    DynamicFormComponent,
    SimulatorComponent,
    StatisticsDashboardComponent,
    StatisticTemplateComponent,
    PieChartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatCheckboxModule, MatSlideToggleModule,
    ChartsModule
  ],
  exports: [],
  providers: [HttpErrorHandler, MyMessageService],
  bootstrap: [AppComponent],
  entryComponents: [DialogComponent, DialogSimpleComponent]
})
export class AppModule {
}
