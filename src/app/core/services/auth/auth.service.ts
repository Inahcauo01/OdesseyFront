import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  Login(loginObj: any) {
    return this.http.post('http://localhost:8080/api/v1/auth/login', loginObj);
  }

  isLoggedIn() {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.log("Access token not found");
      return false;
    }
    try {
      const decodedToken = JSON.parse(atob(accessToken!.split('.')[1]));
      const current_time = new Date().getTime() / 1000;
      console.log("Token expiration time: ", decodedToken.exp);
      console.log("Current time: ", current_time);
      return current_time < decodedToken.exp;
    }catch (e) {
      console.error("Error during decoding token: ", e);
      return false;
    }
  }

  isManager() {
    if (!this.isLoggedIn()) {
      return false;
    }
    const myToken = localStorage.getItem('accessToken');
    const decodedToken = JSON.parse(atob(myToken!.split('.')[1]));
    console.table(decodedToken.roles);
    return decodedToken.roles.some((role: any) => role.authority === 'ROLE_MANAGER');
  }

  isJury() {
    if (!this.isLoggedIn()) {
      return false;
    }
    const myToken = localStorage.getItem('accessToken');
    const decodedToken = JSON.parse(atob(myToken!.split('.')[1]));
    console.table(decodedToken.roles);
    return decodedToken.roles.some((role: any) => role.authority === 'ROLE_JURY');
  }



    logout() {
    return this.http.post('http://localhost:8080/api/v1/auth/logout', {});
  }

  refreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken)
      console.error("No refresh token found");
    return this.http.post('http://localhost:8080/api/v1/auth/refresh', {refreshToken}).pipe();
  }

  isMember() {
    const myToken = localStorage.getItem('accessToken');
    const decodedToken = JSON.parse(atob(myToken!.split('.')[1]));
    console.table(decodedToken.roles);
    return decodedToken.roles.some((role: any) => role.authority === 'ROLE_USER');
  }
}
