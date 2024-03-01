import { Component } from '@angular/core';
import {Trip} from "../../models/Trip";
import { TripService } from '../../../core/services/trips/trip.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.css'
})
export class DestinationsComponent {

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
