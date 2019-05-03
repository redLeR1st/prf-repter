import { Component, OnInit } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { ListHotelsComponent } from '../list-hotels/list-hotels.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SignupService } from '../signup.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-update-hotel',
  templateUrl: './update-hotel.component.html',
  styleUrls: ['./update-hotel.component.scss']
})
export class UpdateHotelComponent implements OnInit {

  up;
  angForm: FormGroup;
  constructor(private fb: FormBuilder, private sv: SignupService, private app: AppComponent) {
    this.createForm();
    
  }
  createForm() {
    this.angForm = this.fb.group({
      fullname: [''],
      roomnumber: [''],
      availablerooms: ['']
    });
  }

  update_hotel(form) {
    console.log("from form");
    console.log(form.fullname + form.roomnumber + form.availablerooms);
    console.log(this.up);
    this.sv.update_hotel(form.fullname, form.roomnumber, form.availablerooms)
  }

  ngOnInit() {
    this.up = this.sv.hotel_to_update;
  }

}
