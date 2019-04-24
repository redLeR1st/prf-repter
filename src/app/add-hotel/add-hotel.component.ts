import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private signup_sv: SignupService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      hotelname: ['', Validators.required ],
      hotelfullname: ['', Validators.required ],
      roomnumber: ['', Validators.required ],
      availablerooms: ['', Validators.required ]
    });
  }

  addHotel(form) {
    this.signup_sv.addHotel(form.hotelname, form.hotelfullname, form.roomnumber, form.availablerooms)
  }

  ngOnInit() {
  }

}
