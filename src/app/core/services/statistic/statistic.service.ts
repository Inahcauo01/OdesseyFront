import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private http: HttpClient) { }


  getStatistic() {
    return this.http.get('http://localhost:8080/api/v1/statistic');
  }
}
