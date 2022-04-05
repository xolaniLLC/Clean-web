import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-reservation',
  templateUrl: './form-reservation.component.html',
  styleUrls: ['./form-reservation.component.scss']
})
export class FormReservationComponent implements OnInit {

  stepMake = 4;

  constructor() { }

  ngOnInit(): void {
  }

  save(form: any) {

  }

}
