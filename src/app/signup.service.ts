import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { user } from './model/user';
// import { user } from './model/user'

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  

  uri = 'https://prf-hotel-app.herokuapp.com';
  // uri = 'http://localhost:5000';


  constructor(private http: HttpClient) { }

  signup(username, fullname, password, email) {
    const obj = {
      username: username,
      fullname: fullname,
      password: password,
      email: email,
      admin: false
    };
    console.log("signup: POST")
    this.http.post(`${this.uri}/register`, obj, {responseType: "text"/*, withCredentials: true*/})
        .subscribe(res => console.log('Done'));
  }

  addHotel(hotelname, hotelfullname, roomnumber, availablerooms) {
    const obj = {
      qname: hotelname,
      fullname: hotelfullname,
      room_number: roomnumber,
      availalble_rooms: availablerooms,
      image: "test"
    };
    console.log("signup: POST")
    this.http.post(`${this.uri}/new-hotel`, obj, {responseType: "text"/*, withCredentials: true*/})
        .subscribe(res => console.log('Done'));

  }


  getHotels() {
    return this
           .http
           .get(`${this.uri}/hotels`);
  }

  getUsers() {
    let userTestStatus: { username: string, fullname: string }[] = [
      { "username": "uname0", "fullname": "Available" },
      { "username": "uname1", "fullname": "Ready" },
      { "username": "uname2", "fullname": "Started" }
  ];
  // var users: user[]
    return userTestStatus

    // return this
    //        .http
    //        .get(`${this.uri}`);
  }


}
