import { Component } from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {StatisticService} from "../../../core/services/statistic/statistic.service";
import {TripService} from "../../../core/services/trips/trip.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  basicOptions: any;
  numberOfUsers?: number;
  numberOfTrips?: number;
  numberOfReservations?: number = 0;
  numberOfAccommodations?: number;
  tripData: any;
  data: any;


  constructor(private primengConfig: PrimeNGConfig,
              private statisticService: StatisticService,
              private tripService: TripService) {}

  ngOnInit() {
    this.getStatistic();


    this.primengConfig.ripple = true;

    this.statisticService.getStatistic().subscribe((result: any) => {
      const topAccommodations = result.result.topAccommodations; // slice(0, 5) Get top 5 accommodations
      console.log(topAccommodations);
      this.data = {
        labels: topAccommodations.map((accommodation: any) => accommodation.name),
        datasets: [
          {
            data: topAccommodations.map((accommodation: any) => accommodation.tripCount),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
          }
        ]
      };
    });


    // Trip Data
    this.getTripData();
  }

  private getStatistic() {
    this.statisticService.getStatistic().subscribe((result: any) => {
      console.log(result.result);
      this.numberOfUsers = result.result.totalUsers;
      this.numberOfTrips = result.result.totalTrips;
      // this.numberOfReservations = result.result.totalReservations;
      this.numberOfAccommodations = result.result.totalAccommodations;
    });
  }


  private getTripData() {
    this.tripService.getTrips().subscribe((data: any) => {
      this.tripData = {
        labels: data.result.map((trip: any) => trip.title),
        datasets: [
          {
            label: 'Total Places',
            data: data.result.map((trip: any) => trip.seats),
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgb(255, 159, 64)',
            borderWidth: 1
          },
          {
            label: 'Reserved Places',
            data: [40, 29, 30, 52, 30, 55],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1
          }
        ]
      }
    }
    );
  }
}
