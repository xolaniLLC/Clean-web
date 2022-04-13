import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {AuthentificationService} from "../services/authentification.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  pass: boolean = false;
  isLoading = false;

  constructor(private location: Location, private router: Router, private authService: AuthentificationService, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.pass = !this.pass;
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(
      () => {
        this.location.back();
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  loginEmail(form: any) {
    this.isLoading = true;
    this.authService.signInUser(form.value.email, form.value.password).then(
      () => {
        this.location.back();
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

}
