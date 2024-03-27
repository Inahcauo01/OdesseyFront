import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  sendEmail(email: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/email', email);
  }

  sendEmailWithAttachment(emailRequest: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/v1/email/attachment', emailRequest);
  }


}
