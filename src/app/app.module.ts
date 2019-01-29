import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IssuesComponent} from './issues/issues.component';

import {HttpClientModule} from '@angular/common/http';
import {MatInputModule, MatPaginatorModule, MatSidenavModule, MatSortModule, MatTableModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpErrorHandler} from './http-error-handler.service';
import {MyMessageService} from './my-message.service';
import {UnifiedTableComponent} from './unified-table/unified-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {DevicesComponent} from './devices/devices.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    UnifiedTableComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,
    AppRoutingModule,
    MatSidenavModule
  ],
  exports: [
    MatTableModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSortModule, MatSidenavModule
  ],
  providers: [HttpErrorHandler, MyMessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
