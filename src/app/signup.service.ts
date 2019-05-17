import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs';
import user from './model/user';
import hotel from './model/hotel';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  

  uri = 'https://prf-hotel-app.herokuapp.com';
  cur_user: user;
  hotel_to_update: any;
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
    
    var fd = new FormData();

    fd.append("qname", hotelname);
    fd.append("fullname", hotelfullname);
    fd.append("room_number", roomnumber);
    fd.append("availalble_rooms", availablerooms);
    if (image) {
      fd.append('image', image, image.name);
    }
    console.log("FormData: ");
    console.log(fd);
    this.http.post(`${this.uri}/new-hotel`, fd, {responseType: "json", withCredentials: true})
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
  loged_in_user_subscriber() : user {
    var dat:user
    this.loged_in_user().subscribe((data: user) => {
      console.log(data);
      dat = data;
    });
    return dat;
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
    this.cur_user = null;
    this.loged_in_user()
      .subscribe((data: user) => {
        this.cur_user = data;
      });

    if (this.cur_user && this.cur_user.username == user.username) { //The deleted and the loged out user is the same
      this.log_out();
    } 
    const obj = {
      username: user.username
    };
    this
      .http
      .post(`${this.uri}/user`, obj, {responseType: "json", withCredentials: true})
      .subscribe(res => console.log('Done'));
    
  }
    //console.log("FROM SERVICE: delete_user not implemented yet");

  delete_hotel(hotel) {
    const obj = {
      qname: hotel.qname
    }

    console.log("delelte hotel:");
    console.log(obj);

    this
      .http
      .post(`${this.uri}/hotel`, obj, {responseType: "json", withCredentials: true})
      .subscribe(res => console.log('Done'));
  }

  update_user(user: any, new_username, new_fname: any, new_email: any, new_pass: any) {
    if (new_fname === "") {
      new_fname = user.fullname;
    }
    if (new_email === "") {
      new_email = user.email;
    }

    const obj = {
      username: user.username,
      fullname: new_fname,
      email: new_email,
      password: new_pass
    }
    console.log("OBJ to send: \n") 
    console.log(obj)
    return this
        .http
        .put(`${this.uri}/user`, obj, {responseType: "json", withCredentials: true})
        
  }
  update_hotel(fullname, room_number: any, availalble_rooms : any) {
    if (fullname === "") {
      fullname = this.hotel_to_update.fullname;
    }
    if (!room_number) {
      room_number = this.hotel_to_update.room_number;
    }
    if (!availalble_rooms) {
      availalble_rooms = this.hotel_to_update.availalble_rooms;
    }

    const obj = {
      qname: this.hotel_to_update.qname,
      fullname: fullname,
      room_number: room_number,
      availalble_rooms: availalble_rooms
    }
    console.log("OBJ to send: \n") 
    console.log(obj)
    console.log("update_hotel \n") 
    console.log(this.hotel_to_update)
    this
        .http
        .put(`${this.uri}/hotel`, obj, {responseType: "json", withCredentials: true})
        .subscribe(res => console.log('Done'), err => console.log(err));
  }

  setHotel_to_update(hotel: any) {
    console.log("This hotel will be updated:")
    console.log(hotel);
    this.hotel_to_update = hotel;
  }
}
