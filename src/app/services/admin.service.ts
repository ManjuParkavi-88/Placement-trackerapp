
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) {}

  // 🔹 1. Get all Interview + Shortlisted students
  getInterviewShortlistDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/interview-shortlist`);
  }

  // 🔹 2. Get all feedbacks
  getAllFeedbacks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/feedbacks`);
  }

  // 🔹 3. Update feedback
  updateFeedback(id: number, updatedFeedback: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/feedbacks/${id}`, updatedFeedback);
  }

  // 🔹 4. Delete feedback
  deleteFeedback(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/feedbacks/${id}`);
  }

  
}
