import { Component } from '@angular/core';
import {CTrip, Trip} from "../../../shared/models/Trip";
import {TripService} from "../../../core/services/trips/trip.service";
import {initFlowbite} from "flowbite";
import {ToastrService} from "ngx-toastr";
import {Flowbite} from "../../../config/flowbite";

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrl: './trips.component.css'
})

@Flowbite()
export class TripsComponent {

  trips: Trip[] = [];
  trip: Trip = new CTrip();
  countries: any[] = [];
  cities: any[] = [];
  accommodations: any[] = [];
  // selectedCountry: string | null = null;

  showModal: boolean = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }

  constructor(private tripService: TripService, private toastr: ToastrService) { }

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
    if (this.trip.country) {
      this.loadCities(this.trip.country);
    } else {
      this.cities = [];
    }
  }

  loadCities(countryName: string): void {
    this.tripService.getCities(countryName).subscribe((cities:any) => {
      this.cities = cities.result;
    });
  }

  private loadAccommodations() {
    this.tripService.getAccommodations().subscribe((data: any) => {
      this.accommodations = data.result;
    });
  }

  addTrip() {
    this.tripService.addTrip(this.trip).subscribe((data: any) => {
      this.toastr.success('Trip added successfully', 'Success');
      this.getTrips();
      this.toggleModal();
    }, (err) => {
      if (err.error.errors && Array.isArray(err.error.errors)) {
        err.error.errors.forEach((error: any) => {
          this.toastr.error(error.message, error.field);
        })
        console.error('Error adding trip', err);
      }
      else {
        this.toastr.error('Error adding trip', 'Error');
      }
    });
  }

  deleteTrip(id: number | undefined) {

    if (confirm('Are you sure you want to delete this trip?'))
    this.tripService.deleteTrip(id).subscribe((data: any) => {
      this.toastr.success('Trip deleted successfully', 'Success');
      this.getTrips();
    });
  }
}
