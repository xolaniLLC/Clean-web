import { Injectable } from '@angular/core';
import {Reservation} from "../models/reservation";
import firebase from "firebase";
import {Utilisateur} from "../models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor() { }

  async addReservation(ac: Reservation) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('reservations').doc(ac.id).set(Object.assign({}, ac)).then(
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
      firebase.firestore().collection('reservations').doc(reservation.id).set(Object.assign({}, reservation)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getAllReservation() {
    return new Promise<Reservation[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('reservations').onSnapshot(
        (docRef) => {
          const result: Reservation[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Reservation);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
