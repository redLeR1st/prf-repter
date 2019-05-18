import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignupService } from '../signup.service';
import { AlertService } from '../services/index';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { AppComponent } from '../app.component';
import {MatSnackBar} from '@angular/material';

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

@Component({
  selector: 'snack-bar-component-example-snack-sucsess',
  templateUrl: 'snack-bar-component-example-snack-succ.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent_sucsess {}

@Component({
  selector: 'snack-bar-component-example-snack-failed',
  templateUrl: 'snack-bar-component-example-snack-fail.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class PizzaPartyComponent_failed {}