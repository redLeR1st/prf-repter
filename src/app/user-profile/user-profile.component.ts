import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import user from '../model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private sv: SignupService) { }

  user: user;

  ngOnInit() {
    console.log("User\n");
    this.sv
      .loged_in_user()
      .subscribe((data: user) => {
        console.log(data);
        this.user = data;
      });
  }

}
