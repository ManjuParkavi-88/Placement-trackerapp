import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private baseUrl = 'http://localhost:8080/api/admins'; // adjust if needed

  constructor(private http: HttpClient) {}

  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, adminData);
  }

  loginAdmin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
