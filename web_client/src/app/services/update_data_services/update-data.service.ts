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

  updateJatekos(jatekos_id: string, nev: string, felhasznalonev: string, email: string, jelszo: string, szuletesi_datum: string) {
    return this.http.put(`http://localhost:3000/jatekos/${jatekos_id}`, {nev, felhasznalonev, email, jelszo, szuletesi_datum}).toPromise();
  }

  updateVerseny(versenyId: string, jatekos_id: string, nev: string, leiras: string, nyitasDatuma: string, engedelyezve: string, allapot: string) {
    return this.http.put(`http://localhost:3000/verseny/${versenyId}`, { jatekos_id, nev, leiras, nyitasDatuma, engedelyezve, allapot }).toPromise();
  }

  updateForum(forumId: string, nev: string) {
    return this.http.put(`http://localhost:3000/forum/${forumId}`, { nev }).toPromise();
  }

  updateHozzaszolas(hozzaszolas_id: string, jatekos_id: string, forum_id: string, szoveg: string, datum: string) {
    return this.http.put(`http://localhost:3000/hozzaszolas/${hozzaszolas_id}`, { jatekos_id, forum_id, szoveg, datum }).toPromise();
  }

  updateTemakor(temakor_id: string, forum_id: string, nev: string) {
    return this.http.put(`http://localhost:3000/temakor/${temakor_id}`, { forum_id, nev }).toPromise();
  }

  updateJatekszoba(jatekszobaId: string, jatekos_id: string, temakor_id: string, nehezsegi_szint: number, idopont: string) {
    return this.http.put(`http://localhost:3000/jatekszoba/${jatekszobaId}`, { jatekos_id, temakor_id, nehezsegi_szint, idopont }).toPromise();
  }

  updateKerdes(kerdesId: string, temakor_id: string, szoveg: string, nehezsegi_szint: number) {
    return this.http.put(`http://localhost:3000/kerdes/${kerdesId}`, { temakor_id, szoveg, nehezsegi_szint }).toPromise();
  }

  updateValasz(valaszId: string, kerdes_id: string, szoveg: string, helyesseg: number) {
    return this.http.put(`http://localhost:3000/valasz/${valaszId}`, { kerdes_id, szoveg, helyesseg }).toPromise();
  }









}
