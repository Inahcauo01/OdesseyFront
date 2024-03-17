import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../../../shared/models/User";

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

  getUserByUserName(username: string) {
    return this.http.get(`http://localhost:8080/api/v1/user/username/${username}`);
  }

  verifyPassword(username: string, password: string) {
    return this.http.post(`http://localhost:8080/api/v1/user/verify-password`, {username, password});
  }

  updateUser(userInfo: User) {
    return this.http.put(`http://localhost:8080/api/v1/user`, userInfo);
  }
}
