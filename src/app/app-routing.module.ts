import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WAdminComponent} from "./w-admin/w-admin.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {RedirectGuardService} from "./services/redirect-guard.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'w-admin', canActivate: [AuthGuardService], component: WAdminComponent },
  { path: 'login', canActivate: [RedirectGuardService], component: LoginComponent },
  { path: 'register', canActivate: [RedirectGuardService], component: RegisterComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
