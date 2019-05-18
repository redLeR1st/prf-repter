import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import user from '../model/user';
import { DialogContentExampleDialog } from '../sb-container/sb-container.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {

  users: user[];

  constructor(private sv: SignupService, private dialog : MatDialog, private _router: Router) { }

  get_the_users() {
    console.log("List_users\n");
    this.sv.getUsers()
      .subscribe((data: user[]) => {
        this.users = data;
      });
  }

  ngOnInit() {
    this.get_the_users();
  }

  async delete_user(user: user) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {name: user.username}
    });
    
    await dialogRef.afterClosed().toPromise().then(async result => {
      console.log(`Dialog result: ${result}`);      
      
      if (result) {
        await this.sv.delete_user(user).toPromise().then(result => console.log("Done"));
        console.log("Refresh");
        this.get_the_users();
      }
    });
    // this.sv.delete_user(user);
  }
}
