export class Utilisateur {

  photo: string;
  date: string;
  phone: string;
  verifier: string;
  finish: string;

  constructor(public nom: string, public email: string, public typeInscription: string, public permissions: string) {
    this.photo = '';
    this.date = new Date().toString();
    this.phone = '';
    this.verifier = '';
    this.finish = '';
  }
}
