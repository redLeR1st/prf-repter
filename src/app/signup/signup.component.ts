import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { PasswordValidation } from '../PasswordValidation';
import { MatSnackBar } from '@angular/material';
import { Signup_success, Signup_error } from '../sb-container/sb-container.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  
  angForm: FormGroup;
  durationInSeconds: number = 5;
  constructor(private fb: FormBuilder, private signup_sv: SignupService, private snackBar: MatSnackBar) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      fullname: ['', Validators.required ],
      password: ['', Validators.required ],
      confirmPass: [''], 
      email: ['', Validators.email ]
    }, { validator : PasswordValidation.MatchPassword });
  }

//   checkPasswords(group: FormGroup) { // here we have the 'passwords' group
//   let pass = group.controls.password.value;
//   let confirmPass = group.controls.confirmPass.value;

//   return pass === confirmPass ? null : { notSame: true }
// }

  signup(form) {
    this.signup_sv.signup(form.username, form.fullname, form.password, form.email)
    .subscribe(res => {
      console.log('Done');
      this.snackBar.openFromComponent(Signup_success, {
        duration: this.durationInSeconds * 1000,
      });
    }, error => {
      this.snackBar.openFromComponent(Signup_error, {
        duration: this.durationInSeconds * 1000,
      });
    });
  }

  ngOnInit() {
  }

}
