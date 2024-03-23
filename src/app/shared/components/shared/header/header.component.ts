import {Component, signal} from '@angular/core';
import {AuthService} from "../../../../core/services/auth/auth.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthService,
              private router: Router,
              private toastr: ToastrService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

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
