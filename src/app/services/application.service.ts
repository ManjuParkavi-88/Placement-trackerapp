import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/application.model';
import { ApplicationDTO } from '../models/application.model';
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

  // ✅ Create new application
  addApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  // ✅ Update application status
  updateApplication(id: number, updated: Partial<Application>): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, updated);
  }

  // ✅ Delete application
  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  updateInterviewResponse(applicationId: number, response: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${applicationId}/response?response=${response}`, {});
  }
// ✅ Get all applications for admin view
getAdminApplications(): Observable<ApplicationDTO[]> {
  return this.http.get<ApplicationDTO[]>(`${this.apiUrl}/admin/all`);
}

// ✅ Update status (e.g. to Shortlisted)
shortlistApplication(applicationId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/${applicationId}/status?status=Shortlisted`, {});
}

// ✅ Send interview notification for a student
sendInterviewNotification(studentId: number): Observable<any> {
  return this.http.put(`${this.apiUrl}/interview-notification/${studentId}`, {});
}
getInterviewSchedulesByStudentId(studentId: number): Observable<any[]> {
  return this.http.get<any[]>(`http://localhost:8080/api/admin/interview-schedules/student/${studentId}`);
}
postStudentFeedback(feedback: any): Observable<any> {
  return this.http.post(`http://localhost:8080/api/student/feedbacks`, feedback);
}
}
