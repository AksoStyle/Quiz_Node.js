import { Component, Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackbarService } from '../services/snackbar_service/snackbar.service';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../services/login_service/login.service';
import { Loginresponse } from '../interfaces/loginresponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  

  constructor(
    private router: Router,
    private snackbarService: SnackbarService,
    private http: HttpClient,
    private loginService: LoginService,
    
  ) { }

  loginForm = new FormGroup({
    felhasznalonev: new FormControl('', Validators.required),
    jelszo: new FormControl('', Validators.required),
    }
  )


  login() {
    const felhasznalonev = this.loginForm.get('felhasznalonev')?.value;
    const jelszo = this.loginForm.get('jelszo')?.value;

    const loginData = ({
      felhasznalonev: felhasznalonev!,
      jelszo: jelszo!,
    })
    console.log("username: ", loginData.felhasznalonev, " - password: ", loginData.jelszo);
    this.loginService.getLoggedIn(loginData.felhasznalonev, loginData.jelszo).subscribe(
      (response: Loginresponse) => {
        if (response.success) {
          this.snackbarService.show(['Sikeres bejelentkezés']);
          this.router.navigate(['/data']);
        } else {
          this.snackbarService.show(['Helytelen felhasználónév és jelszó páros']);
        }
      },
      error => {
        console.error(error);
        this.snackbarService.show(['no no']);
      }
    );
    
    
  }
}
