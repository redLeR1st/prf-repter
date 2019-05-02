import { Component, OnInit } from '@angular/core';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';
import { NavigationCancel,
        Event,
        NavigationEnd,
        NavigationError,
        NavigationStart,
        Router } from '@angular/router';
import { SignupService } from './signup.service';
import user from './model/user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  user = null;

  ngOnInit(): void {
    console.log("User\n");
    this.sv
      .loged_in_user()
      .subscribe((data: user) => {
        this.user = data;
        console.log(this.user);
    });
  }
  title = 'repter-foglalo';
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router, private sv: SignupService) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }

  log_out() {
    console.log("log_out")
    this.user = null;
    this.sv.log_out();
  }

  loged_in_user() {
    console.log("User\n");
    this.sv
      .loged_in_user()
      .subscribe((data: user) => {
        this.user = data;
        console.log(this.user);
      });
  }
  get_loged_in_user(){
    return this.user;
  }

}