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
  delete_user() {
    throw new Error("Method not implemented.");
  }

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
    return this.http.post(`${this.uri}/login`, obj, { withCredentials: true})
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

}
