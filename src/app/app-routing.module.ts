import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';
import { PackingComponent } from './packing/packing.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path : '', component : LoginComponent},
  {path: 'dashboard', component: DashComponent, canActivate: [AuthGuard] },
  {path: 'packing', component: PackingComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
