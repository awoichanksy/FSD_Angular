import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IssuesComponent} from "./issues/issues.component";
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path: 'issues', component: IssuesComponent},
  {path: '', redirectTo: '/issues', pathMatch: 'full'},
  {path: '**', component: IssuesComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    ),
  ],
  exports: [
    RouterModule
  ]

})
export class AppRoutingModule {
}
