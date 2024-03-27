import { Component } from '@angular/core';
import {ReservationService} from "../../../../core/services/reservation.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../../../core/services/user/user.service";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrl: './my-reservations.component.css'
})
export class MyReservationsComponent {

  reservations: any[] = [];
  userId:any;

  constructor(private reservationService: ReservationService,
              private toaster: ToastrService,
              private userService: UserService) {
  }


  ngOnInit(): void {
    this.extractUserIdFromToken();
  }

  private loadReservations() {
    let reservationStatus = 'PENDING';
    console.log("User ID: ", this.userId);
    this.reservationService.getReservationsByUserIdAndStatus(this.userId, reservationStatus).subscribe(
      (response: any) => {
        console.log("Reservations: ", response.result);
        this.reservations = response.result;
      },
      (error: any) => {
        console.log(error);
        this.toaster.error('Error loading reservations');
      }
    );
  }

  private extractUserIdFromToken(): any {
    const token = localStorage.getItem('accessToken');

    if (token) {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const username = JSON.parse(decodedPayload).sub;
      this.userService.getUserByUserName(username).subscribe(
        (response: any) => {
          console.log("method User ID: ", response.result.id);
          this.userId = response.result.id;
          this.loadReservations();
        },
        (error: any) => {
          console.log(error);
          this.toaster.error('Error loading user');
        }
      );
    }

  }

  downloadTicketPdf() {
    this.reservationService.getTicketPdf(18).subscribe((response: HttpResponse<Blob>) => {
      if (response.body) {
        const file = new Blob([response.body], { type: 'application/pdf' });
        const fileURL = URL.createObjectURL(file);
        window.open(fileURL); // Open PDF in a new tab
      } else {
        this.toaster.error('Error: PDF content is empty');
      }
    }, (error) => {
      this.toaster.error('Error during getting ticket');
    });
  }
}
