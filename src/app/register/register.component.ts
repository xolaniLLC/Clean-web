import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Utilisateur} from "../models/utilisateur";
import {AuthentificationService} from "../services/authentification.service";
import {AlertService} from "../services/alert.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  pass: boolean = false;

  constructor(private location: Location, private authService: AuthentificationService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
  }

  clickEvent() {
    this.pass = !this.pass;
  }

  registerEmail(form: any) {
    this.isLoading = true;
    const user: Utilisateur = new Utilisateur(form.value.nomRegister.toLocaleLowerCase(), form.value.emailRegister.toLocaleLowerCase(), 'email', '0000');
    if(form.value.phone) { user.phone = form.value.phone; }
    this.authService.signUpUser(user, form.value.passwordRegister).then(
      () => {
        this.location.back();
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }

  lrgoogle() {
    this.isLoading = true;
    this.authService.GoogleAuth().then(
      () => {
        this.router.navigateByUrl('home');
      },
      (error) => {
        this.isLoading = false;
        this.alertService.print(error, 'danger');
      }
    );
  }
}
