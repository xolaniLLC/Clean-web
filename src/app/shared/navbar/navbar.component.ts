import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  show: boolean = false

  showMenu(){
    this.show =! this.show

  }

  ngOnInit(): void {
  }

}
