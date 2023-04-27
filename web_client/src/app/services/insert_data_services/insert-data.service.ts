import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

  ;
@Injectable({
  providedIn: 'root'
})
export class InsertDataService {
  constructor(private http: HttpClient) { }

  insertNewVerseny(jatekosId: number, nev: string, leiras: string, nyitasiDatum: string, engedelyezve: string, allapot: string) {
    const body = { jatekosId, nev, leiras, nyitasiDatum, engedelyezve, allapot };
    console.log('insert-data.service.js: ' , body);
    return this.http.post('http://localhost:3000/verseny', body);
  }

}
