import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { AuthGuard } from './shared/auth.guard';
import { PreventAuthGuard } from './shared/prevent-auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent, canActivate: [PreventAuthGuard]},
  {path:'signup', component:SignupComponent,canActivate: [PreventAuthGuard]},
  {path:'dashboard', component: EmployeeDashboardComponent,
canActivate: [AuthGuard],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
