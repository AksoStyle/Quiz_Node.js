import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'token';

  constructor(private router: Router) { }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return token !== null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    console.log('token: ' + localStorage.getItem(this.tokenKey));
    
  }
}
