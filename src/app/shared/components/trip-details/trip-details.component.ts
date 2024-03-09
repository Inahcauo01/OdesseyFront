import { Component } from '@angular/core';
import {TripService} from "../../../core/services/trips/trip.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent {
  apiKey = 'K8cRoTBEualerQGu6G16oWAOqW7EQqAZJewzjpQzTsXkN8ULvW9ACHV2';
  images: any[] = [];

  constructor(private tripService: TripService, private toastr: ToastrService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getPexelsImage();
    this.getTripDetails();
  }

  private getPexelsImage() {
    const url = 'https://api.pexels.com/v1/search?query=Rabat&per_page=4';
    this.http.get<any>(url, { headers: { Authorization: this.apiKey } }).subscribe(response => {
      this.images = response.photos.slice(0, 4);
      console.log(this.images); // Add this line to check images in console
    });
  }


  private getTripDetails() {

  }
}
