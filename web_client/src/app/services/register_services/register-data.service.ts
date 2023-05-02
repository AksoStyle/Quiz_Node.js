import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(nev: string, felhasznalonev: string, email: string, jelszo: string, szuletesiDatum: string, pontszam: number) {
    const body = { nev, felhasznalonev, email, jelszo, szuletesiDatum, pontszam };
    return this.http.post('http://localhost:3000/register', body);
  }
}