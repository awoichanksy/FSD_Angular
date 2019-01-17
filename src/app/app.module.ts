import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IssuesComponent} from './issues/issues.component';

import {HttpClientModule} from '@angular/common/http';
import {MatTableModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule
  ],
  exports: [MatTableModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
