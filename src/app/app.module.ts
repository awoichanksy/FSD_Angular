import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IssuesComponent} from './issues/issues.component';

import {HttpClientModule} from '@angular/common/http';
import {MatTableModule, MatPaginatorModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {HttpErrorHandler} from './http-error-handler.service';
import {MyMessageService} from './my-message.service';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule, MatPaginatorModule,
    BrowserAnimationsModule
  ],
  exports: [MatTableModule],
  providers: [HttpErrorHandler, MyMessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
