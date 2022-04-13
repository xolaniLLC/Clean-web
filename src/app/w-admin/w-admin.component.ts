import { Component, OnInit } from '@angular/core';
import {Utilisateur} from "../models/utilisateur";
import {UserService} from "../services/user.service";
import firebase from "firebase";
import {AlertService} from "../services/alert.service";
import {Reservation} from "../models/reservation";
import {AuthentificationService} from "../services/authentification.service";
import {ReservationService} from "../services/reservation.service";

@Component({
  selector: 'app-w-admin',
  templateUrl: './w-admin.component.html',
  styleUrls: ['./w-admin.component.scss']
})
export class WAdminComponent implements OnInit {

  isList: number = 0;
  isMenu: boolean = false;
  isSearch: boolean = false;
  currentUser: Utilisateur | any;
  authorised = false;
  allUser: Utilisateur[] = [];
  allReservationFinish: Reservation[] = [];
  allReservationAttente: Reservation[] = [];
  menu = 0;
  table_interact = true;
  isLoading = false;
  dropDownList: any;

  constructor(private reservationService: ReservationService, private authService: AuthentificationService, private userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.userService.getInfosUserWitchId(firebase.auth().currentUser?.email).then(
      (data) => {
        this.currentUser = data;
        if(Number(this.currentUser.permissions) !== 0) {
          this.authorised = true;

          if(this.currentUser.permissions[0] === '1') {
            this.reservationService.getAllReservation().then(
              (data0) => {
                const pointe = this;
                data0.forEach(function (doc) {
                  if(doc.dateTimeConfirmer)
                    pointe.allReservationFinish.push(doc);
                  else
                    pointe.allReservationAttente.push(doc);
                });
              }
            );
          }

          if(this.currentUser.permissions[1] === '1') {
            this.userService.getAllUser().then(
              (data1) => {
                this.allUser = data1;
              }
            );
          }
        }
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

  updatePermission(user: Utilisateur, indexPermission: number) {
    this.isLoading = true;
    let tmpPermission = '0000';
    switch (indexPermission) {
      case 1:
        tmpPermission = (user.permissions[0] === '0' ? '1' : '0') + user.permissions[1] + user.permissions[2] + user.permissions[3];
        break;
      case 2:
        tmpPermission = user.permissions[0] + (user.permissions[1] === '0' ? '1' : '0') + user.permissions[2] + user.permissions[3];
        break;
      case 3:
        tmpPermission = user.permissions[0] + user.permissions[1] + (user.permissions[2] === '0' ? '1' : '0') + user.permissions[3];
        break;
      case 4:
        tmpPermission = user.permissions[0] + user.permissions[1] + user.permissions[2] + (user.permissions[3] === '0' ? '1' : '0');
        break;
    }
    user.permissions = tmpPermission;
    this.userService.updateUser(user).then(
      () => {
        this.isLoading = false;
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

  saveReservation(reserv: Reservation) {
    this.isLoading = true;
    reserv.auteurConfirmation = firebase.auth().currentUser?.email as any;
    this.reservationService.updateReservation(reserv).then(
      () => {
        this.isLoading = false;
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

  checkAll(value: any) {
    this.table_interact = value;
  }

  goDeconnect() {
    this.authService.signOut().then(
      () => {
        location.reload();
      }
    );
  }

}
