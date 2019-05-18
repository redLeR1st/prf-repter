import { SignupService } from './../signup.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import user from '../model/user';

@Injectable()
export class AuthGuard implements CanActivate {

  loged_in_user : user = null;
  constructor(private _authService: SignupService, private _router: Router) {
    
  }

  async get_that_user() {
    try {
      var dat: user;
      var res = await this._authService.loged_in_user().toPromise();
      this.loged_in_user = <user>res;
    } catch {
      console.log("No one logged in!");
    }
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    await this._authService.loged_in_user_directly().then((data : user ) => {
      this.loged_in_user = data;
    });

    if (this.loged_in_user) {
      return true;
    }
    // navigate to login page
    console.log("You have nothing to do here! :@3");
    this._router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }

}