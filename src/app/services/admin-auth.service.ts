import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {
  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  registerAdmin(adminData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, adminData);
  }

  loginAdmin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/reset-password`, {
      email,
      newPassword
    });
  }
}
