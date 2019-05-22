import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import Upload from 'material-ui-upload/Upload';
import { Hotel_added } from '../sb-container/sb-container.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.scss']
})
export class AddHotelComponent implements OnInit {

  image = null

  angForm: FormGroup;
  durationInSeconds: number = 5;
  constructor(private fb: FormBuilder, private signup_sv: SignupService, private snackBar: MatSnackBar) {
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
    .subscribe(res => {
      console.log('Done')
      this.snackBar.openFromComponent(Hotel_added, {
        duration: this.durationInSeconds * 1000,
      });
    });
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
