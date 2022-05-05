import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {WashesComponent} from "./washes/washes.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {ProfilComponent} from "./profil/profil.component";
import {RedirectGuardService} from "./services/redirect-guard.service";
import {AuthGuardService} from "./services/auth-guard.service";
import {BookComponent} from "./book/book.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'book', component: BookComponent },
  { path: 'login', canActivate: [RedirectGuardService], component: LoginComponent },
  { path: 'register', canActivate: [RedirectGuardService], component: RegisterComponent },
  { path: 'profil', canActivate: [AuthGuardService], component: ProfilComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
