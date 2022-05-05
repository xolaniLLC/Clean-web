import { Injectable } from '@angular/core';
import {Reservation} from "../model/Reservation";
import firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  async addReservation(ac: Reservation) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('reservations-v3').doc(ac.id).set(Object.assign({}, ac)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async updateReservation(reservation: Reservation) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('reservations-v3').doc(reservation.id).set(Object.assign({}, reservation)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }
}
