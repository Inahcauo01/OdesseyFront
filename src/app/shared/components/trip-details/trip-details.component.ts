import { Component } from '@angular/core';
import {TripService} from "../../../core/services/trips/trip.service";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {CTrip} from "../../models/Trip";
import {initFlowbite} from "flowbite";
import {ReservationService} from "../../../core/services/reservation.service";
import {EmailService} from "../../../core/services/email/email.service";

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
  tripDetails :any = new CTrip();
  reservationObjet: any = {};
  emailRequestObj: any = {};

  constructor(private tripService: TripService,
              private reservationService: ReservationService,
              private emailService: EmailService,
              private toastr: ToastrService,
              private router: Router,
              private http: HttpClient,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    initFlowbite();
    this.route.params.subscribe(params => {
      this.tripId = params['id'];
      this.getTripDetails();
    });
  }

  private getPexelsImage(city: string) {
    const url = `https://api.pexels.com/v1/search?query=${city}&per_page=4`;
    this.http.get<any>(url, { headers: { Authorization: this.apiKeyPexels } }).subscribe(response => {
      this.images = response.photos.slice(0, 4);
      console.log(this.images);
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
      // this.getUnsplashImages(data.result.city);
      this.tripDetails = data.result;
    }, (error) => {
      this.toastr.error('Error loading trip details', 'Error');
    });
  }

  reserveTrip(tripId: number) {
    this.reservationObjet.tripId = tripId;
    this.reservationObjet.reservationDate = new Date();
    this.reservationObjet.username = this.extractUsernameFromToken();
    console.log('username : '+this.extractUsernameFromToken());

    this.reservationService.saveReservation(this.reservationObjet).subscribe((data: any) => {

      this.emailRequestObj.email = this.extractEmailFromToken();
      this.emailRequestObj.reservationId = data.result.id;

      this.emailService.sendEmailWithAttachment(this.emailRequestObj).subscribe((data: any) => {
        this.toastr.success('Trip reserved successfully', 'Success');
      }, (error) => {
        this.toastr.error('Error while sending email', 'Error');
        console.error(error);
      });
      this.toastr.success('Trip reserved successfully', 'Success');
      this.router.navigate(['/reservation-page', data.result['id']]);

    }, (error) => {
      this.toastr.error('Error while reserving trip', 'Error');
      console.error(error);
    });
  }

  private extractUsernameFromToken(): string {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = window.atob(payload);
      return JSON.parse(decodedPayload).sub;
    }
    return '';
  }

  private extractEmailFromToken() {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = window.atob(payload);
      return JSON.parse(decodedPayload).email;
    }
    return '';
  }
}
