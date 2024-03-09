import { Component } from '@angular/core';
import {CTrip, Trip} from "../../../shared/models/Trip";
import {TripService} from "../../../core/services/trips/trip.service";
import {initFlowbite} from "flowbite";

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
  accommodations: any[] = [];
  selectedCountry: number | null = null;

  showModal: boolean = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(private tripService: TripService) { }

  ngOnInit(): void {
    initFlowbite();
    this.getTrips();
    this.loadCountries();
    this.loadAccommodations();
  }

  getTrips(): void {
    this.tripService.getTrips().subscribe((data: any) => {
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

  private loadAccommodations() {
    this.tripService.getAccommodations().subscribe((data: any) => {
      this.accommodations = data.result;
    });
  }

}
