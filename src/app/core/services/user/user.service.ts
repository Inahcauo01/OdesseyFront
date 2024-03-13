import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post('http://localhost:8080/api/v1/auth/register', user);
  }

  loginUser(user: any) {
    return this.http.post('http://localhost:8080/api/v1/user/login', user);
  }

  getAllUsers() {
    return this.http.get('http://localhost:8080/api/v1/user');
  }

  deleteUser(id: number | undefined) {
    return this.http.delete(`http://localhost:8080/api/v1/user/${id}`);
  }
}
