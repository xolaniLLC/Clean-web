import { Component, OnInit } from '@angular/core';
import {Location} from "@angular/common";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";
import {AlertService} from "../services/alert.service";
import {Utilisateur} from "../model/Utilisateur";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLoading = false;
  pass = false;

  constructor(private location: Location, private authService: AuthentificationService, private router: Router, private alertService: AlertService) { }

  ngOnInit(): void {
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

  clickEvent() {
    this.pass = !this.pass;
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
