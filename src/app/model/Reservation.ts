import {ToolsService} from "../services/tools.service";

export class Reservation {

  id: string;
  date: string;
  noms: string;
  email: string;
  phone: string;
  adress: string;
  dateTimeReserve: string;
  dateTimeConfirmer: string;
  auteurConfirmation: string;
  price: number;
  offre: string;
  detailPaiement: any;

  constructor() {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.noms = '';
    this.email = '';
    this.phone = '';
    this.adress = '';
    this.dateTimeReserve = '';
    this.dateTimeConfirmer = '';
    this.auteurConfirmation = '';
    this.price = 0;
    this.offre = '';
  }
}
