import { Component } from '@angular/core';
import {Trip} from "../../../shared/models/Trip";
import {TripService} from "../../../core/services/trips/trip.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {
  trips: Trip[] = [];

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe((data: any) => {
      console.log(data);
      this.trips = data.result;
    }, (error) => {
      console.error('Error loading trips', error);
    });
  }

}
