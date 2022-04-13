import { Component, OnInit } from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {UserService} from "../../services/user.service";
import firebase from "firebase";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthentificationService, private userService: UserService) { }

  currentUser: any = null;
  isConnected = 0;
  openMenuProfil = false;
  isList: any;

  ngOnInit(): void {
    this.authService.isAuthenticated().then(
      (val) => {
        if(val) {
          this.isConnected = 1;
          this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
            (data) => {
              this.currentUser = data;
            }
          );
        } else { this.isConnected = -1; }
      }
    );
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        location.reload();
      }
    );
  }

}
