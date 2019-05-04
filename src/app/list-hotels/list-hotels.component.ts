import { Component, OnInit } from '@angular/core';
import hotel from '../model/hotel';
import { SignupService } from '../signup.service';
import user from '../model/user';
import { isAbsolute } from 'path';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.scss']
})
export class ListHotelsComponent implements OnInit {

  isAdmin = false;
  user: user;
  hotels: hotel[];
  edit = false;

  angForm: FormGroup;
  hotel_forms: FormArray;

  index_of_hotel = -1;
  hotel_to_update: any;
  show_me_how_to_live: any;
  base64Flag: string;
  state: { img: string; };
  picture: any;

  constructor(private sanitizer:DomSanitizer, protected fb: FormBuilder, protected sv: SignupService, protected app: AppComponent) {
   }
   get_hotel_to_update() {
     return this.hotel_to_update;
   }


  createHotel(): FormGroup {
    return this.fb.group({
      fullname: new FormControl ("PELDAA"),
      num_of_rooms: new FormControl ("5985"),
      num_of_avlb_rooms: new FormControl ("88888")
    });
  }

  arrayBufferToBase64(buffer) {
    var binary = '';
    var bytes = [].slice.call(new Uint8Array(buffer));
    bytes.forEach((b) => binary += String.fromCharCode(b));
    return window.btoa(binary);
};


  ngOnInit() {
    this.angForm = this.fb.group({
      hotel_forms: this.fb.array([this.createHotel()])
    });

    console.log("this.hotel_forms");
    console.log(this.hotel_forms);

    this.edit = false;
    this.index_of_hotel = -1;
    console.log("List_hotels\n");
    this.sv
      .getHotels()
      .subscribe((data: any[]) => {
        console.log(data[0].images[0].data);
        this.base64Flag = 'data:image/jpeg;base64,';
        this.show_me_how_to_live = this.arrayBufferToBase64(data[0].images[0].data.data);

        this.picture = this.base64Flag + this.show_me_how_to_live;

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

  start_edit(hotel) {
    console.log("UPDETEE MEE:")
    console.log(hotel);
    this.sv.setHotel_to_update(hotel);
  }
  cancel_edit() {
    this.edit = false;
    this.index_of_hotel = -1;
  }

  delete_hotel(hotel){
    this.sv.delete_hotel(hotel);
  }
}
