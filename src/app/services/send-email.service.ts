import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SendEmailService {

  constructor(private http: HttpClient) {
  }

  sendWelcomeWitchEmail(adresse: string) {

    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('content-type', 'application/json')
      .set('postman-token', 'b408a67d-5f78-54fc-2fb7-00f6e9cefbd1')
      .set('Authorization', 'Basic ' + btoa('671a9c03c448e3405956157ec12ca719:8a16ad3baf2e8f7e89882bbee65ab97b'));

    const body = {
      "Messages":[
        {
          "From": {
            "Email": "peguy.seffi@letsrealize.com",
            "Name": "Xolani estatus"
          },
          "To": [
            {
              "Email": adresse
            }
          ],
          "TemplateID": 3291221,
          "TemplateLanguage": true
        }
      ]
    };

    return new Promise<void>((resolve, reject) => {

      this.http.post('https://cors-anywhere.herokuapp.com/' + 'https://api.mailjet.com/v3.1/send', body, { headers: headers})
        .subscribe(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  sendMessageEmail(adresse: string, message: string) {

    const headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', '*')
      .set('content-type', 'application/json')
      .set('postman-token', 'b408a67d-5f78-54fc-2fb7-00f6e9cefbd1')
      .set('Authorization', 'Basic ' + btoa('671a9c03c448e3405956157ec12ca719:8a16ad3baf2e8f7e89882bbee65ab97b'));

    const body = {
      "Messages":[
        {
          "From": {
            "Email": "peguy.seffi@letsrealize.com",
            "Name": "WASH"
          },
          "To": [
            {
              "Email": adresse
            }
          ],
          "TemplateID": 3847106,
          "TemplateLanguage": true,
          "Variables": {
            "message": message
          }
        }
      ]
    };

    return new Promise<void>((resolve, reject) => {

      this.http.post('https://hidden-castle-88131.herokuapp.com/' + 'https://api.mailjet.com/v3.1/send', body, { headers: headers})
        .subscribe(
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
