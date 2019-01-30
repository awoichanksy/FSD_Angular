import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IssuesComponent} from "./issues/issues.component";
import {RouterModule, Routes} from '@angular/router';
import {DevicesComponent} from "./devices/devices.component";
import {SolversComponent} from "./solvers/solvers.component";

const appRoutes: Routes = [
  {path: 'issues', component: IssuesComponent},
  {path: 'devices', component: DevicesComponent},
  {path: 'solvers', component: SolversComponent},
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
