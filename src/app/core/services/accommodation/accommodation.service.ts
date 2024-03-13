import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Accommodation} from "../../../shared/models/Accommodation";

@Injectable({
  providedIn: 'root'
})
export class AccommodationService {

  apiUrl = 'http://localhost:8080/api/v1/accommodation';

  constructor(private http: HttpClient) { }

  saveAccommodation(accommodation: Accommodation, image: File): Observable<any>  {
    const formData = new FormData();
    formData.append('accommodation', JSON.stringify(accommodation));
    formData.append('image', image);
    return this.http.post<any>(this.apiUrl, formData);
  }
}
