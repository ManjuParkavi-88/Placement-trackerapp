import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Application, ApplicationDTO } from '../models/application.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {
  private apiUrl = 'http://localhost:8080/api/applications';

  constructor(private http: HttpClient) {}

  // ✅ Get all applications
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  // ✅ Get applications by student ID
  getApplicationsByStudentId(studentId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/student/${studentId}`);
  }

  // ✅ Add new application
  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  // ✅ Update application
  updateApplication(id: number, updated: Partial<Application>): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, updated);
  }

  // ✅ Delete application
  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // ✅ Student: Update interview response
  updateInterviewResponse(applicationId: number, response: string): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.apiUrl}/${applicationId}/response?response=${response}`,
      {},
      { observe: 'response' } // ✅ This enables res.status access in component
    );
  }

  // ✅ Admin: Get all applications with job info
  getAdminApplications(): Observable<ApplicationDTO[]> {
    return this.http.get<ApplicationDTO[]>(`${this.apiUrl}/admin/all`);
  }

  // ✅ Admin: Shortlist application
  shortlistApplication(applicationId: number): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.apiUrl}/${applicationId}/status?status=Shortlisted`,
      {},
      { observe: 'response' }
    );
  }

  // ✅ Admin: Send interview notification to student
  sendInterviewNotification(studentId: number): Observable<HttpResponse<any>> {
    return this.http.put(
      `${this.apiUrl}/interview-notification/${studentId}`,
      {},
      { observe: 'response' }
    );
  }

  // ✅ Student: Get interview schedules
  getInterviewSchedulesByStudentId(studentId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/api/admin/interview-schedules/student/${studentId}`
    );
  }

  // ✅ Student: Post feedback
  postStudentFeedback(feedback: any): Observable<HttpResponse<any>> {
    return this.http.post(
      `http://localhost:8080/api/student/feedbacks`,
      feedback,
      { observe: 'response' }
    );
  }
}
