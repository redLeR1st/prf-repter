import { Component, OnInit } from '@angular/core';
import hotel from '../model/hotel';
import { SignupService } from '../signup.service';
import user from '../model/user';
import { isAbsolute } from 'path';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css']
})
export class ListHotelsComponent implements OnInit {

  isAdmin = false;
  user: user;


  hotels: hotel[];
  constructor(private sv: SignupService, private app: AppComponent) { }

  ngOnInit() {
    console.log("List_hotels\n");
    this.sv
      .getHotels()
      .subscribe((data: hotel[]) => {
        this.hotels = data;
      });

    console.log("User\n");
    this.user = this.app.get_loged_in_user();
    if (this.user) {
      this.isAdmin = this.user.admin;
    }
  }

  reservate(hotel: hotel) {
    this.sv.reservate(hotel.qname, this.user.username, hotel.room_number);
  }

}
