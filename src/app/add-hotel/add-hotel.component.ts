import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import Upload from 'material-ui-upload/Upload';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit {

  image = null

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private signup_sv: SignupService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      hotelname: ['', Validators.required ],
      hotelfullname: ['', Validators.required ],
      roomnumber: ['', Validators.required ],
      availablerooms: ['', Validators.required ],
      pictures: ['']
    });
  }

  addHotel(form) {
    this.signup_sv.addHotel(form.hotelname, form.hotelfullname, form.roomnumber, form.availablerooms, this.image)
  }

  // onFileLoad = (e, file) => console.log(e.target.result, file.name);
  importFile(event) {

    if (event.target.files.length == 0) {
       console.log("No file selected!");
       return
    }
      let file: File = event.target.files[0];
      // after here 'file' can be accessed and used for further process
      this.image = file;
      console.log(this.image);
    }


  ngOnInit() {
  }

}
