import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendSmsService {

  constructor(private http: HttpClient) { }

  sendMessageSms(numbers: string[], message: string) {

    let cmp = 0;
    const appel = this;

    return new Promise<void>((resolve, reject) => {

      // tslint:disable-next-line:variable-name only-arrow-functions typedef
      numbers.forEach(function(number) {
        cmp++;

        return appel.http.get('https://hidden-castle-88131.herokuapp.com/https://www.easysendsms.com/sms/bulksms-api/bulksms-api?username=paulmexa2021&password=esm85944&from=Wash&to=' + number + '&text=' + message + '&type=1')
          .subscribe(
            (result) => {
              cmp++;
              if (cmp === numbers.length) { resolve(); }
            },
            (error) => {
              reject(error);
            }
          );
      });
    });
  }
}
