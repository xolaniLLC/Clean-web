import { Component, OnInit } from '@angular/core';
import {Reservation} from "../../models/reservation";
import {AlertService} from "../../services/alert.service";
import {ReservationService} from "../../services/reservation.service";
import {SendEmailService} from "../../services/send-email.service";
import {SendSmsService} from "../../services/send-sms.service";
import {UserService} from "../../services/user.service";
import {AuthentificationService} from "../../services/authentification.service";
import firebase from "firebase";
import {PaymentService} from "../../services/payment.service";

@Component({
  selector: 'app-form-reservation',
  templateUrl: './form-reservation.component.html',
  styleUrls: ['./form-reservation.component.scss']
})
export class FormReservationComponent implements OnInit {

  isLoading = false;
  tmpReservation: Reservation = new Reservation();
  oldReservation: Reservation[] = [];
  allResponsables: any[] = [];
  sure = false;
  isConnect = false;

  constructor(private paymentService: PaymentService, private authService: AuthentificationService, private userService: UserService, private alertService: AlertService, private reservationService: ReservationService, private sendEmail: SendEmailService, private sendSMS: SendSmsService) { }

  ngOnInit(): void {
    this.userService.getAllResponsable().then(
      (data) => {
        this.allResponsables = data;

        this.authService.isAuthenticated().then(
          (val) => {
            if(val) {
              this.isConnect = true;
              this.reservationService.getReservationWitchEmail(firebase.auth().currentUser?.email as string).then(
                (data) => {
                  const pointe = this;
                  data.forEach(function(reserve) {
                    if(!pointe.verifyIsContainReservation(reserve.model)){
                      reserve.dateTimeReserve1 = '';
                      reserve.dateTimeReserve2 = '';
                      reserve.dateTimeReserve3 = '';
                      reserve.dateTimeConfirmer = '';
                      pointe.oldReservation.push(reserve);
                    }
                  });
                }
              )
            }
          }
        )
      }
    );
  }

  reinit() {
    this.tmpReservation = new Reservation();
  }

  verifyIsContainReservation (model: string) {
    let result = false;
    for(let i=0; i<this.oldReservation.length && !result; i++) {
      if(this.oldReservation[i].model === model)
        result = true;
    }
    return result;
  }

  setOldResev(reserv: Reservation) {
    reserv.date = this.tmpReservation.date;
    reserv.dateTimeConfirmer = '';
    reserv.auteurConfirmation = '';
    reserv.infosPayment = '';
    reserv.confirmInfos = false;
    reserv.dateTimeReserve1 = '';
    reserv.dateTimeReserve2 = '';
    reserv.dateTimeReserve3 = '';
    this.sure = true;
    this.tmpReservation = reserv;
  }

  validerReservation(offre: string, sommes: number) {
    this.paymentService.initializePayment(this.tmpReservation.noms, offre, sommes).then(
      (result) => {
        this.tmpReservation.infosPayment = result;
        const message = 'Dear ' + this.tmpReservation.noms + ', \n\n' +
          'Thank you for using our service, a member of our team will contact you as soon as possible for a confirmation of the date.';
        const messageAdmin = 'New reservation : \n, ' +
          'Name :' + this.tmpReservation.noms + '\n, ' +
          'Phone :' + this.tmpReservation.phone + '\n, ' +
          'Email :' + this.tmpReservation.email + '\n, ' +
          'ZipCode :' + this.tmpReservation.zipCode + '\n, ' +
          'More detail :' + this.tmpReservation.detailAdress + '\n, ' +
          'Brand :' + this.tmpReservation.brand + '\n, ' +
          'Model :' + this.tmpReservation.model + '\n, ' +
          'Year :' + this.tmpReservation.annee + '\n, ' +
          'Date reservation 1 :' + this.tmpReservation.dateTimeReserve1 + '\n, ' +
          'Date reservation 2 :' + this.tmpReservation.dateTimeReserve2 + '\n, ' +
          'Date reservation 3 :' + this.tmpReservation.dateTimeReserve3 + '\n, ';

        this.reservationService.addReservation(this.tmpReservation).then(
          () => {

            this.tmpReservation = new Reservation();
            this.isLoading = false;
            this.alertService.print('Operation successfully completed', 'success');

            if(this.tmpReservation.email) { this.sendEmail.sendMessageEmail(this.tmpReservation.email, message).then(); }
            if(this.tmpReservation.phone) { this.sendSMS.sendMessageSms([this.tmpReservation.phone], message).then(); }

            const pointe = this;
            pointe.allResponsables.forEach(function (doc) {
              pointe.sendEmail.sendMessageEmail(doc.email, messageAdmin).then();
              pointe.sendSMS.sendMessageSms([doc.phone], messageAdmin).then();
            });

          }, (error) => {
            this.isLoading = false;
            this.alertService.print(error, 'danger');
          }
        );
      }
    );
  }

  save(form: any) {
    if(!this.tmpReservation.email && !this.tmpReservation.phone) {
      this.isLoading = false;
      this.alertService.print('You must at least enter a phone number or your email address', 'warning');
    } else {
      this.tmpReservation.confirmInfos = this.sure;
    }
  }

}
