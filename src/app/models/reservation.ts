import {ToolsService} from "../services/tools.service";

export class Reservation {

  id: string;
  date: string;
  noms: string;
  email: string;
  phone: string;
  zipCode: string;
  detailAdress: string;
  brand: string;
  model: string;
  annee: string;
  confirmInfos: boolean;
  infosPayment: any;
  dateTimeReserve1: string;
  dateTimeReserve2: string;
  dateTimeReserve3: string;
  dateTimeConfirmer: string;
  auteurConfirmation: string;

  constructor() {
    const gid = new ToolsService();
    this.id = gid.generateId(23);
    this.date = new Date().toString();
    this.noms = '';
    this.email = '';
    this.phone = '';
    this.zipCode = '';
    this.detailAdress = '';
    this.brand = '';
    this.model = '';
    this.annee = '';
    this.dateTimeReserve1 = '';
    this.dateTimeReserve2 = '';
    this.dateTimeReserve3 = '';
    this.dateTimeConfirmer = '';
    this.auteurConfirmation = '';
    this.confirmInfos = false;
    this.infosPayment = null;
  }
}
