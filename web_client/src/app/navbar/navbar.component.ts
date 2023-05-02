import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from '../authguard/authservice.service';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbarService: SnackbarService,
  ) { }

  onLogoutClick(): void {
    if (this.authService.isLoggedIn()) {

      this.authService.logout();
      this.snackbarService.show(['Sikeres kijelentkezés']);
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 500);

    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
