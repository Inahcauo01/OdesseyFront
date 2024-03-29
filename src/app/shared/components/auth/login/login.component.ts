import { Component } from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/services/auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj: any = {
    "username": "",
    "password": ""
  }

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}


  onLogin(){
    // validate the username and password
    if (!this.loginObj.username) {
      this.toastr.warning('Username is required');
      return;
    }
    if (!this.loginObj.password) {
      this.toastr.warning('Password is required');
      return;
    }

    // call the login service
    this.authService.Login(this.loginObj).subscribe((res: any) => {
      console.log("res : "+res);
      if (res.token) {
        this.toastr.success('Login Success');
        localStorage.setItem('accessToken', res.token);
        localStorage.setItem('refreshToken', res.refreshToken);
        this.redirectByRole(res.token);
      } else {
        this.toastr.error('Login Failed');
      }
    }, error => {
      this.toastr.error('Error while login');
    });
  }

  isActive: boolean = false;

  toggleContainer(active: boolean): void {
    this.isActive = active;
  }

  private redirectByRole(token: string) {
    // decode the token
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    if (tokenData.roles.some((role: any) => role.authority === 'ROLE_ADMIN')) {
      this.router.navigate(['/admin/dashboard']);
      // this.toastr.info('Admin role')
    } else if (tokenData.roles.some((role: any) => role.authority === 'ROLE_USER')) {
      this.router.navigate(['/']);
      // this.toastr.info('User role')
    } else {
      this.toastr.error('Invalid Role');
    }
  }
}
