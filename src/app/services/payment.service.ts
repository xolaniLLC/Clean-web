import { Injectable } from '@angular/core';
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  paymentHandler:any = null;

  constructor(private alertService: AlertService) {
    this.invokeStripe();
  }

  async initializePayment(nom: string, description: string, amount: number) {
    return new Promise<any>((resolve, reject) => {
      const paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
        locale: 'auto',
        token: function (stripeToken: any) {
          resolve(stripeToken);
        }
      });

      paymentHandler.open({
        name: nom ? nom : 'Name not defined',
        description: description,
        amount: amount * 100
      });
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_sLUqHXtqXOkwSdPosC8ZikQ800snMatYMb',
          locale: 'auto',
          token: function (stripeToken: any) {
            this.alertService.print('Payment has been successfull!', 'success');
          }
        });
      }
      window.document.body.appendChild(script);
    }
  }
}
