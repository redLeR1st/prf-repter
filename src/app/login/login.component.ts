import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { AlertService } from '../services/index';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  msg;
  constructor(private fb: FormBuilder, private sv: SignupService, private alertService: AlertService) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      username: ['', Validators.required ],
      password: ['', Validators.required ],
    });
  }

  login(form) {
    this.sv.login(form.username, form.password)
    .subscribe(res => {
      console.log('Done');
      this.msg = "OK";
    },
    error => {
      console.log("error: " + error);
      if (error.includes("Forbidden"))
        this.msg = "Forbidden";
    });
  }
  
  ngOnInit() {
  }

}
