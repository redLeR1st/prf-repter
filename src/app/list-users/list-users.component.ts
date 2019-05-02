import { Component, OnInit } from '@angular/core';
import { SignupComponent } from '../signup/signup.component';
import { SignupService } from '../signup.service';
import user from '../model/user';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: user[];

  constructor(private sv: SignupService) { }

  ngOnInit() {
    console.log("List_users\n");
    this.sv.getUsers()
      .subscribe((data: user[]) => {
        this.users = data;
      });
  }

  delete_user(user: user) {
    this.sv.delete_user(user);
  }
}
