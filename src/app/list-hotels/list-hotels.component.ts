import { Component, OnInit } from '@angular/core';
import hotel from '../model/hotel';
import { SignupService } from '../signup.service';

@Component({
  selector: 'app-list-hotels',
  templateUrl: './list-hotels.component.html',
  styleUrls: ['./list-hotels.component.css']
})
export class ListHotelsComponent implements OnInit {

  hotels: hotel[];
  constructor(private signup_sv: SignupService) { }

  ngOnInit() {
    console.log("Im here\n");
    this.signup_sv
      .getHotels()
      .subscribe((data: hotel[]) => {
        this.hotels = data;
      });
  }

}
