import { Component, OnInit } from '@angular/core';
import hotel from '../model/hotel';
import { SignupService } from '../signup.service';
import user from '../model/user';
import { isAbsolute } from 'path';
import { AppComponent } from '../app.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import { DialogContentExampleDialog, Hotel_reserved } from '../sb-container/sb-container.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { async } from '@angular/core/testing';

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
  durationInSeconds: number = 5;

  constructor(private sanitizer:DomSanitizer, protected fb: FormBuilder,
    protected sv: SignupService, protected app: AppComponent,
    private dialog: MatDialog, private snackBar: MatSnackBar) {
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


  async list_this_hotels() {
    console.log("List_hotels\n");
    await this.sv
      .getHotels()
        .subscribe((data: any[]) => {
        if (data.length != 0) {
          console.log(data[0].images[0].data);
          this.base64Flag = 'data:image/jpeg;base64,';
          
          // data.forEach(async function(element, index) {
           
          for (var i = 0; i < data.length; i++) {
            if (data[i].images[0]) {
              this.show_me_how_to_live = this.arrayBufferToBase64(data[i].images[0].data.data);
              this.picture = this.base64Flag + this.show_me_how_to_live;
              data[i].images[0] = this.picture;
            } else {
              data[i].images[0] = "no_image";
            }
          }
          // });
          this.hotels = data;
        }
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
    this.list_this_hotels();
    console.log("User\n");
    this.user = this.app.get_loged_in_user();
    if (this.user) {
      this.isAdmin = this.user.admin;
    }
  }

  reservate(hotel: hotel) {
    this.sv.reservate(hotel.qname, this.user.username, hotel.room_number).
    subscribe(res => {
      console.log('Done')
      this.snackBar.openFromComponent(Hotel_reserved, {
        duration: this.durationInSeconds * 1000,
      });
    });
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

  async delete_hotel(hotel: hotel){
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {name: hotel.qname}
    });
    
    await dialogRef.afterClosed().toPromise().then(async result => {
      console.log(`Dialog result: ${result}`);      
      
      if (result) {
        await this.sv.delete_hotel(hotel).toPromise().then(result => console.log("Done"));
        console.log("Refresh");
        this.list_this_hotels();
      }
    });
    // this.sv.delete_hotel(hotel);
  }
}
