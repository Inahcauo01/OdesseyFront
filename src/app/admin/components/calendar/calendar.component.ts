import { Component } from '@angular/core';
import {CalendarOptions} from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import {TripService} from "../../../core/services/trips/trip.service";
import {ToastrService} from "ngx-toastr";
import {Trip} from "../../../shared/models/Trip";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: [],
    handleWindowResize: true
  };

  private colors: string[] = ['#ff6933', '#3366FF', '#e1de20', '#33ff63', '#ff33a0']; // Ajouter les couleurs supplémentaires

  constructor(private tripService: TripService, private toastr: ToastrService) {}

  ngOnInit() {
    this.loadTrips();
  }


  private loadTrips(): void {
    this.tripService.getTrips().subscribe(
      (trips: any) => {
        this.calendarOptions.events = trips.result.map((trip: Trip, index: number) => ({
          title: trip.city+' - '+trip.country+' ('+trip.title+')',
          start: trip.departureDate,
          end: this.calculateEndDate(trip.departureDate, trip.duration),
          backgroundColor: this.getBackgroundColor(trip.departureDate, index)
        }));
      },
      (error) => {
        this.toastr.error('Error while loading trips');
      }
    );
  }

  private calculateEndDate(startDate: any, duration: any): Date {
    console.log("date : "+ startDate);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + duration);
    return endDate;
  }

  private getBackgroundColor(departureDate: any, index: number): string {
    const today = new Date();
    const tripDepartureDate = new Date(departureDate);

    if (tripDepartureDate < today) {
      return 'gray';
    } else {
      return this.colors[index % this.colors.length]
    }
  }
}
