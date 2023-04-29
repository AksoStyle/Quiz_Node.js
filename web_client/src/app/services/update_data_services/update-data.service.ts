import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {

  constructor(private http: HttpClient) { }

  updateAdmin(admin_id: string ,felhasznalonev : string, email: string, jelszo: string) {
    return this.http.put(`http://localhost:3000/admin/${admin_id}`, { felhasznalonev, email, jelszo}).toPromise();
  }

  updateJatekos(jatekos_id: string, nev: string, felhasznalonev: string, email: string, jelszo: string, szuletesiDatum: string) {
    return this.http.put(`http://localhost:3000/jatekos/${jatekos_id}`, {nev, felhasznalonev, email, jelszo, szuletesiDatum}).toPromise();
  }

  updateVerseny(versenyId: string, jatekos_id: string, nev: string, leiras: string, nyitasiDatum: string, engedelyezve: string, allapot: string) {
    return this.http.put(`http://localhost:3000/verseny/${versenyId}`, { jatekos_id, nev, leiras, nyitasiDatum, engedelyezve, allapot }).toPromise();
  }

  updateForum(forumId: string, nev: string) {
    return this.http.put(`http://localhost:3000/forum/${forumId}`, { nev }).toPromise();
  }

  updateHozzaszolas(hozzaszolasId: string, jatekos_id: string, forum_id: string, szoveg: string, datum: string) {
    return this.http.put(`http://localhost:3000/hozzaszolas/${hozzaszolasId}`, { jatekos_id, forum_id, szoveg, datum }).toPromise();
  }

  updateTemakor(temakorId: string, forum_id: string, nev: string) {
    return this.http.put(`http://localhost:3000/temakor/${temakorId}`, { forum_id, nev }).toPromise();
  }

  updateJatekszoba(jatekszobaId: string, jatekos_id: string, temakor_id: string, nehezsegi_szint: number, idopont: string) {
    return this.http.put(`http://localhost:3000/jatekszoba/${jatekszobaId}`, { jatekos_id, temakor_id, nehezsegi_szint, idopont }).toPromise();
  }

  updateKerdes(kerdesId: string, szoveg: string, nehezsegi_szint: number) {
    return this.http.put(`http://localhost:3000/kerdes/${kerdesId}`, { szoveg, nehezsegi_szint }).toPromise();
  }

  updateValasz(valaszId: string, kerdesId: string, szoveg: string, helyesseg: boolean) {
    return this.http.put(`http://localhost:3000/valasz/${valaszId}`, { kerdesId, szoveg, helyesseg }).toPromise();
  }









}
