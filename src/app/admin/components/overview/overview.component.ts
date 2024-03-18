import { Component } from '@angular/core';
import {PrimeNGConfig} from "primeng/api";
import {StatisticService} from "../../../core/services/statistic/statistic.service";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  basicOptions: any;
  numberOfUsers?: number;
  numberOfTrips?: number;
  numberOfReservations?: number;
  numberOfAccommodations?: number;
  tripData: any;
  data: any;


  constructor(private primengConfig: PrimeNGConfig,
              private statisticService: StatisticService) {}

  ngOnInit() {
    this.getStatistic();


    this.primengConfig.ripple = true; // Optional, adds ripple effect to elements
    this.statisticService.getStatistic().subscribe((result: any) => {
      const topAccommodations = result.result.topAccommodations; // slice(0, 5) Get top 5 accommodations
      console.log(topAccommodations);
      // Format data for pie chart
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


    // Trip Data (Mock Data, replace it with your actual trip data)
    this.tripData = {
      labels: ['Trip 1', 'Trip 2', 'Trip 3', 'Trip 4', 'Trip 5', 'Trip 6'],
      datasets: [
        {
          label: 'Number of Places',
          data: [50, 30, 40, 60, 35, 55],
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
    };
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
}
