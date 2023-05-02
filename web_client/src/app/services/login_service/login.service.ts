import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loginresponse } from 'src/app/interfaces/loginresponse';
import { tap } from 'rxjs/operators';
import { UserdataService } from '../userdata_service/userdata.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loginData = {
    token: '',
    jatekos_id: 0,
    nev: '',
    felhasznalonev: '',
    email: '',
    pontszam: 0,
  };

  constructor(
    private http: HttpClient,
    private UserdataService: UserdataService

  ) { }

  getLoggedIn = (felhasznalonev: string, jelszo: string): Observable<Loginresponse> => {
    const body = { felhasznalonev, jelszo};
    return this.http.post<Loginresponse>('http://localhost:3000/login', body)
        .pipe(
            tap(response => {
                if (response.success && response.token) {
                  
                    localStorage.setItem('token', response.token);
                    this.UserdataService.setLoginData(response);
                    console.log(this.UserdataService.loginData);

                    
                }
            })
        );
}
}
