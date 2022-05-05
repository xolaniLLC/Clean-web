import { Component, OnInit } from '@angular/core';
import {Reservation} from "../model/Reservation";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  etape = 1;
  tmpReservation: Reservation = new Reservation();

  formGroup = new FormGroup({
    place: new FormControl(''),
    search: new FormControl(''),
  });

  constructor() { }

  ngOnInit(): void {
  }

  nextEtape() {
    this.etape += 1;
  }

  previewEtape() {
    this.etape -= 1;
  }

  public async onSubmit(): Promise<void> {
    const place = await this.geocode(this.formGroup.value.place);
    console.log(place);
  }

  private async geocode(address: string): Promise<google.maps.GeocoderResult> {
    return new Promise((resolve, reject) => {
      new google.maps.Geocoder().geocode({ address }, (results: any, status: google.maps.GeocoderStatus) => {
        if (status !== google.maps.GeocoderStatus.OK) reject();
        if (status === google.maps.GeocoderStatus.OK) resolve(results[0]);
      });
    });
  }

}
