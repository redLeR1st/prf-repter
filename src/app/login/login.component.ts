import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { AlertService } from '../services/index';
import { AppComponent } from '../app.component';
import { MatSnackBar } from '@angular/material';
import { PizzaPartyComponent_sucsess, PizzaPartyComponent_failed } from '../sb-container/sb-container.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  angForm: FormGroup;
  msg;
  durationInSeconds: number = 5;
  constructor(private fb: FormBuilder, private sv: SignupService, private alertService: AlertService, private app: AppComponent, private snackBar : MatSnackBar) {
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
      this.snackBar.openFromComponent(PizzaPartyComponent_sucsess, {
        duration: this.durationInSeconds * 1000,
      });
      this.app.loged_in_user();
    },
    error => {
      console.log("error");
      this.snackBar.openFromComponent(PizzaPartyComponent_failed, {
        duration: this.durationInSeconds * 1000,
      });
    });
  }

  ngOnInit() {
  }

}
