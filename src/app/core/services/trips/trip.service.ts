import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Trip} from "../../../shared/models/Trip";

@Injectable({
  providedIn: 'root'
})
export class TripService {

  constructor(private http: HttpClient) { }

  apiUrl = 'http://localhost:8080/api/v1/trip';

  getTrips() {
    return this.http.get(this.apiUrl);
  }

  getTrip(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  addTrip(trip: Trip) {
    return this.http.post(this.apiUrl, trip);
  }

  getCountries() {
    return this.http.get('http://localhost:8080/api/v1/country');
  }

  getCities(countryName: string) {
    return this.http.get(`http://localhost:8080/api/v1/country/${countryName}/cities`);
  }

  getAccommodations() {
    return this.http.get('http://localhost:8080/api/v1/accommodation');
  }

  getTripDetails(id: number | undefined) {
    return this.http.get(`http://localhost:8080/api/v1/trip/${id}`);
  }

  deleteTrip(id: number | undefined) {
      return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
