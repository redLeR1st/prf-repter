import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import user from './model/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  uri = 'https://prf-hotel-app.herokuapp.com';
  cur_user: user;
  // uri = 'http://localhost:5000';

 
  constructor(private http: HttpClient) { 
   
  }

  login(username: any, password: any) {
    var obj = {
      username: username,
      password: password
    }

    console.log("login: POST")
    return this.http.post(`${this.uri}/login`, obj, {responseType: "json", withCredentials: true})
    .catch(this.errorHandler);

  }
  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "Server Error");
  }
  

 

  signup(username, fullname, password, email) {
    const obj = {
      username: username,
      fullname: fullname,
      password: password,
      email: email,
      admin: false
    };
    console.log("signup: POST")
    this.http.post(`${this.uri}/register`, obj, {responseType: "json", withCredentials: true})
        .subscribe(res => console.log('Done'));
  }

  addHotel(hotelname, hotelfullname, roomnumber, availablerooms, image) {
    const obj = {
      qname: hotelname,
      fullname: hotelfullname,
      room_number: roomnumber,
      availalble_rooms: availablerooms,
      image: image
    };
    console.log("OBJ: ");
    console.log(obj);
    this.http.post(`${this.uri}/new-hotel`, obj, {responseType: "json", withCredentials: true})
        .subscribe(res => console.log('Done'));

  }


  getHotels() {
    return this
           .http
           .get(`${this.uri}/hotels`, {responseType: "json", withCredentials: true});
  }
  
  getUsers() {
    return this
           .http
           .get(`${this.uri}/users`, {responseType: "json", withCredentials: true});
  }

  // getUsers() {
  //   let userTestStatus: { username: string, fullname: string }[] = [
  //     { "username": "uname0", "fullname": "Available" },
  //     { "username": "uname1", "fullname": "Ready" },
  //     { "username": "uname2", "fullname": "Started" }
  // ];

  //   return userTestStatus

  // }

  loged_in_user() {
    return this
           .http
           .get(`${this.uri}/logged-in-user`, {responseType: "json", withCredentials: true});
  }

  log_out() {
    this
        .http
        .post(`${this.uri}/logout`, {responseType: "json", withCredentials: true})
        .subscribe(res => console.log('Done'));
  }

  reservate(qnmae, username, room_number) {
    const obj = {
      hotel: qnmae,
      user: username,
      room_number: room_number
    };
    console.log("RESERVE: \n");
    console.log(obj);
    this
        .http
        .post(`${this.uri}/reservate`, obj, {responseType: "json", withCredentials: true})
        .subscribe(res => console.log('Done'));
  }

  delete_user(user) {
  //   this.cur_user = null;
  //   this.loged_in_user()
  //     .subscribe((data: user) => {
  //       this.cur_user = data;
  //     });
  //   if (this.cur_user.username == user.username) { //The deleted and the loged out user is the same

  //   } else {
  //     const obj = {
  //       username: user.username
  //     };
  //     this
  //       .http
  //       .delete(`${this.uri}/user`, "asd")
  //       .subscribe(res => console.log('Done'));
  //   }
  // }
    console.log("FROM SERVICE: delete_user not implemented yet");
  }

  delete_hotel(hotel) {
    console.log("FROM SERVICE: delete_hotel not implemented yet");
  }

  update_user(user: any, new_username, new_fname: any, new_email: any, new_pass: any) {
    if (new_username === "") {
      new_username = user.username;
    }
    if (new_fname === "") {
      new_fname = user.fullname;
    }
    if (new_email === "") {
      new_email = user.email;
    }
    if (new_pass === "") { //??????
      new_pass = user.password;
    }

    const obj = {
      username: user.username,
      fullname: new_fname,
      email: new_email,
      password: new_pass
    }
    return this
        .http
        .put(`${this.uri}/user`, obj, {responseType: "json", withCredentials: true})
        
  }

}
