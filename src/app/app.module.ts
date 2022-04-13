import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FormReservationComponent } from './shared/form-reservation/form-reservation.component';
import { FooterComponent } from './shared/footer/footer.component';
import {FormsModule} from "@angular/forms";
import { ToastComponent } from './shared/toast/toast.component';
import {HttpClientModule} from "@angular/common/http";
import { WAdminComponent } from './w-admin/w-admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PageLoadingComponent } from './shared/page-loading/page-loading.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FormReservationComponent,
    FooterComponent,
    ToastComponent,
    WAdminComponent,
    LoginComponent,
    RegisterComponent,
    PageLoadingComponent,
    PageNotFoundComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
