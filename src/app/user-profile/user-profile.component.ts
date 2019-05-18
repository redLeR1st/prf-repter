import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import user from '../model/user';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscriber } from 'rxjs';
import { Router } from '@angular/router';
import { Delete_yourselfe, DialogContentExampleDialog } from '../sb-container/sb-container.component';
import { MatSnackBar, MatDialog } from '@angular/material';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: user;
  edit = false;

  angForm: FormGroup;
  durationInSeconds: number = 5;
  
  constructor(private fb: FormBuilder, private sv: SignupService, private _router: Router, private snackBar: MatSnackBar,
    private app: AppComponent, private dialog: MatDialog) {
    this.createForm();
  }
  
  
  createForm() {
    this.angForm = this.fb.group({
      username: [''],
      fullname: [''],
      email: [''],
      password: [''],
    })
  }
 

  ngOnInit() {
    this.edit = false;
    console.log("User\n");
    this.sv
      .loged_in_user()
      .subscribe((data: user) => {
        console.log(data);
        this.user = data;
      });
  }

  start_edit() {
    this.edit = true;
  }

  cancel_edit() {
    this.edit = false;
  }
  save_changes(form) {
    console.log("SAVE MEE");
    this.sv.update_user(this.user, form.username, form.fullname, form.email, form.password)
    .subscribe(res => this.edit = false), err => {console.log(err)};
  }
  async delete_user() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {name: "YOURSELF"}
    });
    
    await dialogRef.afterClosed().toPromise().then(async result => {
      console.log(`Dialog result: ${result}`);      
      
      if (result) {
        await this.sv.delete_user(this.user)
        .toPromise().then(res => {
          console.log('Done')
          this._router.navigate(['/login']);
          this.snackBar.openFromComponent(Delete_yourselfe, {
            duration: this.durationInSeconds * 1000,
          });
          
          this.app.log_out(false);
        });
        console.log("Refresh");
      }
    });
    
    // this.sv.delete_user(this.user)
    // .subscribe(res => {
    //   console.log('Done')
    //   this._router.navigate(['/login']);
    //   this.snackBar.openFromComponent(Delete_yourselfe, {
    //     duration: this.durationInSeconds * 1000,
    //   });
      
    //   this.app.log_out(false);
    // });
  }
}
