import { Component, OnInit } from '@angular/core';
import hotel from '../model/hotel';
import { SignupService } from '../signup.service';
import user from '../model/user';
import { isAbsolute } from 'path';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

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

  constructor(protected fb: FormBuilder, protected sv: SignupService, protected app: AppComponent) {

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

  start_edit(hotel) {
    console.log("UPDETEE MEE:")
    console.log(hotel);
    this.sv.setHotel_to_update(hotel);
  }
  cancel_edit() {
    this.edit = false;
    this.index_of_hotel = -1;
  }
  save_changes(i, form) {
    console.log("SAVE MEEhotel num: " + i);
    console.log(this.hotels[i]);
    console.log("fnam: " + form.fullname);
    console.log("numroom: " + form.num_of_rooms);
    console.log("numavblroom: " + form.num_of_avlb_rooms);
    

    this.sv.update_hotel(form.fullname, form.num_of_rooms, form.num_of_avlb_rooms)
    .subscribe(res => {/*this.index_of_hotel = -1*/}), err => {console.log(err)};
  }

  delete_hotel(hotel){
    this.sv.delete_hotel(hotel);
  }
}
