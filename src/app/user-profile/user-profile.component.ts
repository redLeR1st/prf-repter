import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import user from '../model/user';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: user;
  edit = false;

  angForm: FormGroup;
  
  constructor(private fb: FormBuilder, private sv: SignupService) {
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
  delete_user() {
    this.sv.delete_user(user);
  }
}
