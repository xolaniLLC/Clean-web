import { Injectable } from '@angular/core';
import firebase from "firebase";
import {Utilisateur} from "../models/utilisateur";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getInfosUserWitchId(id: any) {
    return new Promise<Utilisateur>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(id).get().then(
        (docRef) => {
          resolve(docRef.data() as Utilisateur);
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async updateUser(user: Utilisateur) {
    return new Promise<void>((resolve, reject) => {
      firebase.firestore().collection('comptes').doc(user.email).set(Object.assign({}, user)).then(
        () => {
          resolve();
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  async getAllResponsable() {
    return new Promise<any[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('comptes').where('permissions', '!=', '0000').onSnapshot(
        (docRef) => {
          const result: any[] = [];
          docRef.forEach(function (doc) {
            if(doc.data()['permissions'][0] === '1')
              result.push({email: doc.data()['email'], phone: doc.data()['phone']});
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  async getAllUser() {
    return new Promise<Utilisateur[]>((resolve, reject) => {
      // @ts-ignore
      firebase.firestore().collection('comptes').onSnapshot(
        (docRef) => {
          const result: Utilisateur[] = [];
          docRef.forEach(function (doc) {
            result.push(doc.data() as Utilisateur);
          });
          resolve(result as any);
        }, (error) => {
          reject(error);
        }
      );
    });
  }
}
