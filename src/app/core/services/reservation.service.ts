import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  apiUrl = 'http://localhost:8080/api/v1';

  constructor(private http: HttpClient) { }

  getTicketPdf(reservationId: number): Observable<HttpResponse<Blob>> {
    const url = `${this.apiUrl}/ticket/generate-ticket/${reservationId}`;
    return this.http.get<Blob>(url, { observe: 'response', responseType: 'blob' as 'json' });
  }

  getReservations() {
    return this.http.get('${this.apiUrl}/reservation');
  }

  saveReservation(reservation: any) {
    return this.http.post(`${this.apiUrl}/reservation`, reservation);
  }

  sendTicketByEmail(reservation : any) {
    return this.http.post('${this.apiUrl}/email/attachment', reservation);

  }
}
