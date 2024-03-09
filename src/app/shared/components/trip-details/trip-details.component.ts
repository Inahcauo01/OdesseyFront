import { Component } from '@angular/core';
import {TripService} from "../../../core/services/trips/trip.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css'
})
export class TripDetailsComponent {
  apiKeyPexels = 'K8cRoTBEualerQGu6G16oWAOqW7EQqAZJewzjpQzTsXkN8ULvW9ACHV2';
  clientIdUnsplash: string = 'CkdF9AylTfIdadQ562jaXExUsnCTc2kCzzW0hl8MeOo';
  images: any[] = [];
  tripId?: number ;

  constructor(private tripService: TripService,
              private toastr: ToastrService,
              private http: HttpClient,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.tripId = params['id'];
      this.getTripDetails();
    });
  }

  private getPexelsImage(city: string) {
    const url = `https://api.pexels.com/v1/search?query=${city}&per_page=4`;
    this.http.get<any>(url, { headers: { Authorization: this.apiKeyPexels } }).subscribe(response => {
      this.images = response.photos.slice(0, 4);
    });
  }

  private getUnsplashImages(city: string) {
    const url = `https://api.unsplash.com/photos/random?count=4&client_id=${this.clientIdUnsplash}&query=${city}`;
    this.http.get<any[]>(url, { headers: { Authorization: 'Client-ID ' + this.clientIdUnsplash } }).subscribe(response => {
      this.images = response.map(item => item.urls);
      console.log(this.images);
    });
  }




  private getTripDetails() {
    this.tripService.getTripDetails(this.tripId).subscribe((data: any) => {
      // this.getPexelsImage(data.result.city);
      this.getUnsplashImages(data.result.city);
    }, (error) => {
      this.toastr.error('Error loading trip details', 'Error');
    });
  }

}
