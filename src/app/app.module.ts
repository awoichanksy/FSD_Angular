import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IssuesComponent} from './issues/issues.component';

import {HttpClientModule} from '@angular/common/http';
import {MatInputModule, MatPaginatorModule, MatTableModule, MatSortModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpErrorHandler} from './http-error-handler.service';
import {MyMessageService} from './my-message.service';
import {UnifiedTableComponent} from './unified-table/unified-table.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    UnifiedTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule, MatPaginatorModule, MatSortModule, MatInputModule,
    BrowserAnimationsModule,
    FormsModule, ReactiveFormsModule,

  ],
  exports: [
    MatTableModule, FormsModule, ReactiveFormsModule, MatInputModule, MatSortModule],
  providers: [HttpErrorHandler, MyMessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
