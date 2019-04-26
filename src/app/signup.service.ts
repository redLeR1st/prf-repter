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
  // uri = 'http://localhost:5000';

 
  constructor(private http: HttpClient) { 
   
  }

  login(username: any, password: any) {
    var obj = {
      username: username,
      password: password
    }

    console.log("login: POST")
    return this.http.post(`${this.uri}/login`, obj, {responseType: "text", withCredentials: true})
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
    this.http.post(`${this.uri}/register`, obj, {responseType: "text", withCredentials: true})
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
    console.log("signup: POST")
    this.http.post(`${this.uri}/new-hotel`, obj, {responseType: "text", withCredentials: true})
        .subscribe(res => console.log('Done'));

  }


  getHotels() {
    return this
           .http
           .get(`${this.uri}/hotels`, {withCredentials: true});
  }

  getUsers() {
    let userTestStatus: { username: string, fullname: string }[] = [
      { "username": "uname0", "fullname": "Available" },
      { "username": "uname1", "fullname": "Ready" },
      { "username": "uname2", "fullname": "Started" }
  ];

    return userTestStatus

  }


}
