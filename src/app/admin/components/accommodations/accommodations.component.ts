import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-accommodations',
  templateUrl: './accommodations.component.html',
  styleUrl: './accommodations.component.css'
})
export class AccommodationsComponent {

  accommodations: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAccommodations();
  }

  getAccommodations(): void {
    this.http.get('http://localhost:8080/api/v1/accommodation').subscribe((data: any) => {
      this.accommodations = data.result;
    }, (error) => {
      console.error('Error loading accommodations', error);
    });
  }

}
