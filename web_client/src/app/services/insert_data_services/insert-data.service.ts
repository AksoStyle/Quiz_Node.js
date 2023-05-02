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

  insertNewForum(nev: string) {
    const body = {nev};
    console.log('insert-data.service.js: ' , body);
    return this.http.post('http://localhost:3000/forum', body);
  }

  insertNewHozzaszolas(jatekos_id: number, forum_id: string, szoveg: string, datum: string) {
    const body = { jatekos_id, forum_id, szoveg, datum};
    console.log('insert-data.service.js: ' , body);
    return this.http.post('http://localhost:3000/hozzaszolas', body);
  }

  insertNewTemakor(forum_id: string, nev: string) {
    const body = { forum_id, nev};
    console.log('insert-data.service.js: ' , body);
    return this.http.post('http://localhost:3000/temakor', body);
  }

  insertNewJatekszoba(jatekos_id: number, temakor_id: string, nehezsegi_szint: string, idopont: string) {
    const body = { jatekos_id, temakor_id, nehezsegi_szint, idopont};
    console.log('insert-data.service.js: ' , body);
    return this.http.post('http://localhost:3000/jatekszoba', body);
  }

  insertNewKerdes(temakor_id: string, szoveg: string, nehezsegi_szint: string) {
    const body = { temakor_id, szoveg, nehezsegi_szint};
    console.log('insert-data.service.js: ' , body);
    return this.http.post('http://localhost:3000/kerdes', body);
  }

  insertNewValasz(kerdes_id: number, szoveg: string, helyesseg: string) {
    const body = { kerdes_id, szoveg, helyesseg};
    console.log('insert-data.service.js: ' , body);
    return this.http.post('http://localhost:3000/valasz', body);
  }

}
