import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteDataService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  deleteVersenyData(VersenyID: number) : Observable<any>{
    return this.http.delete(this.apiUrl);
  }
}
