import {Component, HostListener, Input, OnInit} from '@angular/core';
import {AuthentificationService} from "../../services/authentification.service";
import {UserService} from "../../services/user.service";
import firebase from "firebase";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  currentUser: any = null;
  isConnected = 0;

  scrolled = false;

  isList: any;
  isMenu: boolean = false;
  isSearch: boolean = false;

  constructor(private authService: AuthentificationService, private userService: UserService) { }

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

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event: any) {
    this.scrolled = $event.currentTarget.scrollY >= 70;
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        location.reload();
      }
    );
  }

}
