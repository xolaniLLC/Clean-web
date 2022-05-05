import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../model/Utilisateur";
import {UserService} from "../services/user.service";
import firebase from "firebase";
import {AuthentificationService} from "../services/authentification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  currentUser: Utilisateur | any = null;

  constructor(private userService: UserService, private authService: AuthentificationService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (data) => {
        this.currentUser = data;
      }
    );
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        this.router.navigateByUrl('home');
      }
    );
  }

}
