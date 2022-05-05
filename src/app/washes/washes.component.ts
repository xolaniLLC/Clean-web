import { Component, OnInit } from '@angular/core';
import {Reservation} from "../model/Reservation";
import {PaymentService} from "../services/payment.service";
import {AlertService} from "../services/alert.service";
import {ReservationService} from "../services/reservation.service";
import {SendEmailService} from "../services/send-email.service";
import {SendSmsService} from "../services/send-sms.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-washes',
  templateUrl: './washes.component.html',
  styleUrls: ['./washes.component.scss']
})
export class WashesComponent implements OnInit {

  isLoading = false;
  tmpReservation: Reservation = new Reservation();
  allResponsables: any[] = [];

  minDate: Date = new Date ("05/07/2017");
  maxDate: Date = new Date ("08/27/2017");
  value: Date = new Date ("05/16/2017");


  constructor(private userService: UserService, private paymentService: PaymentService, private alertService: AlertService, private reservationService: ReservationService, private sendEmail: SendEmailService, private sendSMS: SendSmsService) { }

  ngOnInit(): void {
    this.userService.getAllResponsable().then(
      (data) => {
        this.allResponsables = data;
      }
    );
  }

  save() {
    this.reservationService.updateReservation(this.tmpReservation).then(
      () => {
        const message = 'Dear ' + this.tmpReservation.noms + ', \n\n' +
          'Thank you for using our service, a member of our team will contact you as soon as possible for a confirmation of the date.';
        const messageAdmin = 'New reservation : \n, ' +
          'Name :' + this.tmpReservation.noms + '\n, ' +
          'Phone :' + this.tmpReservation.phone + '\n, ' +
          'Email :' + this.tmpReservation.email + '\n, ' +
          'Adress :' + this.tmpReservation.adress + '\n, ' +
          'Date reservation :' + this.tmpReservation.dateTimeReserve + '\n, ';

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

  pay() {
    this.paymentService.initializePayment(this.tmpReservation.noms, this.tmpReservation.offre, this.tmpReservation.price).then(
      (result) => {
        this.tmpReservation.detailPaiement = result;
      }, (error) => {
        this.alertService.print(error, 'danger');
      }
    );
  }

}
