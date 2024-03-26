import { Component } from '@angular/core';
import {ReservationService} from "../../../core/services/reservation.service";
import {ToastrService} from "ngx-toastr";
import {HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-reservation-page',
  templateUrl: './reservation-page.component.html',
  styleUrl: './reservation-page.component.css'
})
export class ReservationPageComponent {

  pdfBytes?: ArrayBuffer;


  constructor(private reservationService: ReservationService,
              private toaster: ToastrService) { }

  ngOnInit(): void {
  }

  private getTicket() {
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

  getPdfUrl(): string {
    if (this.pdfBytes) {
      const blob = new Blob([this.pdfBytes], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    }
    return '';
  }

  downloadPdf() {
    this.getTicket();
  }
}
