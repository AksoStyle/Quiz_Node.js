import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  deleteVersenyData(VersenyID: number): Observable<any> {
    const url = `${this.apiUrl}/verseny/${VersenyID}`;
    return this.http.delete(url);
  }

  deleteForumData(ForumID: number): Observable<any> {
    const url = `${this.apiUrl}/forum/${ForumID}`;
    return this.http.delete(url);
  }

  deleteHozzaszolasData(HozzaszolasID: number): Observable<any> {
    const url = `${this.apiUrl}/hozzaszolas/${HozzaszolasID}`;
    return this.http.delete(url);
  }

  deleteTemakorData(TemakorID: number): Observable<any> {
    const url = `${this.apiUrl}/temakor/${TemakorID}`;
    return this.http.delete(url);
  }

  deleteJatekszobaData(jatekosszobaID: number): Observable<any> {
    const url = `${this.apiUrl}/jatekszoba/${jatekosszobaID}`;
    return this.http.delete(url);
  }

  deleteKerdesData(KerdesID: number): Observable<any> {
    const url = `${this.apiUrl}/kerdes/${KerdesID}`;
    return this.http.delete(url);
  }

  deleteValaszData(ValaszID: number): Observable<any> {
    const url = `${this.apiUrl}/valasz/${ValaszID}`;
    return this.http.delete(url);
  }

}
