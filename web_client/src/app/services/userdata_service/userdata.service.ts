import { Injectable } from '@angular/core';
import { Loginresponse } from 'src/app/interfaces/loginresponse';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  loginData = {
    token: '',
    jatekos_id: 0,
    nev: '',
    felhasznalonev: '',
    email: '',
    pontszam: 0,
  };

  constructor() { }

  setLoginData(loginResponse: Loginresponse): void {
    this.loginData.token = loginResponse.token;
    this.loginData.jatekos_id = loginResponse.jatekos_id;
    this.loginData.nev = loginResponse.nev;
    this.loginData.felhasznalonev = loginResponse.felhasznalonev;
    this.loginData.email = loginResponse.email;
    this.loginData.pontszam = loginResponse.pontszam;
  }

  clearLoginData(): void {
    this.loginData = {
      token: '',
      jatekos_id: 0,
      nev: '',
      felhasznalonev: '',
      email: '',
      pontszam: 0,
    };
  }

}
