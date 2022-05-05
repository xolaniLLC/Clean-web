import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { WashesComponent } from './washes/washes.component';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ToastComponent } from './shared/toast/toast.component';
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfilComponent } from './profil/profil.component';
import { PageLoadingComponent } from './shared/page-loading/page-loading.component';
import { BookComponent } from './book/book.component';

import {NgxGooglePlacesAutocompleteModule} from "@codious/ngx-google-places-autocomplete";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavbarComponent,
    FooterComponent,
    WashesComponent,
    ToastComponent,
    LoginComponent,
    RegisterComponent,
    ProfilComponent,
    PageLoadingComponent,
    BookComponent
  ],
    imports: [

        BrowserModule,
        AppRoutingModule,
        FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      NgxGooglePlacesAutocompleteModule.forRoot({
        key: 'AIzaSyCfRnOaMlDHJ0cLmBBTFj1o8kyzX0zyp7g', // your Google API key retrieved from the Google Developer Console
        language: 'nl', // see https://developers.google.com/maps/documentation/javascript/localization
        libraries: 'places', // see https://developers.google.com/maps/documentation/javascript/libraries
        loadScript: false, // whether or not the <script> tag of the Google Maps API should be loaded
        options: { types: ['geocode'] }, // see https://developers.google.com/maps/documentation/javascript/places-autocomplete#add_autocomplete
        region: 'US', // see https://developers.google.com/maps/documentation/javascript/localization#Region
      }),
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
