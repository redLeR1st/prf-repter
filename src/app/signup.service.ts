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
    return this.http.post(`${this.uri}/register`, obj, {responseType: "json", withCredentials: true})
  }

  addHotel(hotelname, hotelfullname, roomnumber, availablerooms, image) {
    
    var fd = new FormData();

    console.log(hotelname);

    fd.append("qname", hotelname);
    fd.append("fullname", hotelfullname);
    fd.append("room_number", roomnumber);
    fd.append("availalble_rooms", availablerooms);
    if (image) {
      fd.append('image', image, image.name);
    } 
    // else {
    //   fd.append('image', null, null);
    // }
    console.log("FormData: ");
    console.log(fd);
    return this.http.post(`${this.uri}/new-hotel`, fd, {responseType: "json", withCredentials: true})        

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
    // return {
    //   getPackings: function() {
        return this
           .http
           .get(`${this.uri}/logged-in-user`, {responseType: "json", withCredentials: true});
    //   }
    // }
  }

  async loged_in_user_directly() {
    try {
      return await this.loged_in_user().toPromise();
    } catch {
      console.log('No user logged in!');
    }
  }

  log_out() {
    var misemegyertelmubb_minthogy_ide_egy_ures_Adat_kell = {}
    return this
        .http
        .post(`${this.uri}/logout`, misemegyertelmubb_minthogy_ide_egy_ures_Adat_kell, {responseType: "json", withCredentials: true})
  }

  reservate(qnmae, username, room_number) {
    const obj = {
      hotel: qnmae,
      user: username,
      room_number: room_number
    };
    console.log("RESERVE: \n");
    console.log(obj);
    return this
        .http
        .post(`${this.uri}/reservate`, obj, {responseType: "json", withCredentials: true})
        
  }

  delete_user(user) {
    this.cur_user = null;
    this.loged_in_user().subscribe((data: user) => {
        this.cur_user = data;
      });

    if (this.cur_user && this.cur_user.username == user.username) { //The deleted and the loged out user is the same
      this.log_out().subscribe(res => {
        console.log('Done');
      });;
    } 
    const obj = {
      username: user.username
    };
    return this
      .http
      .post(`${this.uri}/user`, obj, {responseType: "json", withCredentials: true})
      
    
  }
    //console.log("FROM SERVICE: delete_user not implemented yet");

  delete_hotel(hotel) {
    const obj = {
      qname: hotel.qname
    }

    console.log("delelte hotel:");
    console.log(obj);

    return this
      .http
      .post(`${this.uri}/hotel`, obj, {responseType: "json", withCredentials: true})
      
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

  invalidate_reservation(user: user, hotel: any) {

    const obj = {
      hotel: hotel.hotel,
      user: user.username,
      room_number: hotel.room_number
    }

    console.log("to send:")
    console.log(obj)

    console.log("OBJ to send: \n") 
    console.log(obj)
    return this
        .http
        .put(`${this.uri}/invalidate-reservation`, obj, {responseType: "json", withCredentials: true})
        
  }
}
