import { Component } from '@angular/core';
import {CTrip, Trip} from "../../../shared/models/Trip";
import {TripService} from "../../../core/services/trips/trip.service";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})
export class TripsComponent {
  trips: Trip[] = [];
  trip: Trip = new CTrip();
  countries: any[] = [];
  cities: any[] = [];
  selectedCountry: number | null = null;

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    this.getTrips();
    this.loadCountries();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe((data: any) => {
      console.log(data);
      this.trips = data.result;
    }, (error) => {
      console.error('Error loading trips', error);
    });
  }

  private loadCountries() {
    this.tripService.getCountries().subscribe((data: any) => {
      this.countries = data.result;
    }, (error) => {
      console.error('Error loading countries', error);
    });
  }

  onCountryChange(): void {
    if (this.selectedCountry) {
      this.loadCities(this.selectedCountry);
    } else {
      this.cities = [];
    }
  }

  loadCities(countryId: number): void {
    this.tripService.getCities(countryId).subscribe((cities:any) => {
      this.cities = cities.result;
    });
  }
}
