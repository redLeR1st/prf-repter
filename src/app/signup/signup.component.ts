import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private signup_sv: SignupService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      fullname: ['', Validators.required ],
      password: ['', Validators.required ],
      email: ['', Validators.required ]
    });
  }

  signup(form) {
    this.signup_sv.signup(form.username, form.fullname, form.password, form.email);
  }

  ngOnInit() {
  }

}
