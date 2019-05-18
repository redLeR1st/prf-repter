import { SignupService } from './../signup.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import user from '../model/user';

@Injectable()
export class RoleGuard implements CanActivate {

  loged_in_user : user = null;
  user_role = null;
  constructor(private _authService: SignupService, private _router: Router) {
    
  }

  async get_that_user() {
    var data = await this._authService.loged_in_user().toPromise();
      
    console.log(data);
    this.loged_in_user = <user>data;

    console.log(this.loged_in_user);

    if (!this.loged_in_user) {
      console.log("You have nothing to do here! :@1");
      this._router.navigate(['/login']);
      this.user_role = 'nouser';
    } else if (this.loged_in_user.admin) {
      this.user_role = 'Admin';
    } else {
      this.user_role = 'User';
    }
  }

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   await this._authService.loged_in_user_directly().then((data : user ) => {
      this.loged_in_user = data;
    });

    console.log(this.loged_in_user);

    if (!this.loged_in_user) {
      console.log("You have nothing to do here! :@1");
      this._router.navigate(['/login']);
      this.user_role = 'nouser';
    } else if (this.loged_in_user.admin) {
      this.user_role = 'Admin';
    } else {
      this.user_role = 'User';
    }

    if (this.user_role == next.data.role) {
      return true;
    }

    // navigate to not found page
    console.log("You have nothing to do here! :@2");
    this._router.navigate(['/login']);
    return false;
  }

}