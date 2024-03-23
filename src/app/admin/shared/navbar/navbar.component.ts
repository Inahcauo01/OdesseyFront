import { Component } from '@angular/core';
import {AuthService} from "../../../core/services/auth/auth.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) { }

  logout() {
    this.authService.logout().subscribe(() => {
      if (localStorage.getItem('accessToken') != null || localStorage.getItem('refreshToken') != null) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/login']);
        this.toastr.success('Logout successful');
      }
    }, (error) => {
      console.error(error);
      this.toastr.error('Error during logout'+error.error.message);
    });
  }
}
