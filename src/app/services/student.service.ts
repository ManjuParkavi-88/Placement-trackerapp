import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'http://localhost:8080/api/student';

  constructor(private http: HttpClient) {}

  resetPassword(email: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/reset-password`, { email, newPassword });
  }
}
