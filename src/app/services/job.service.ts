import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Job } from '../models/job.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private studentBaseUrl = 'http://localhost:8080/api/jobs';              // for students
  private adminBaseUrl = 'http://localhost:8080/api/admin/job-postings';  // for admin

  constructor(private http: HttpClient) {}

  // ✅ Student: View jobs
  getAllJobs(): Observable<Job[]> {
    return this.http.get<any[]>(`${this.studentBaseUrl}/listings`).pipe(
      map(rawJobs => rawJobs.map(job => ({
        jobId: job.jobId,
        companyName: job.companyName, // adjust key if needed
        jobRole: job.jobRole,
        jobDescription: job.jobDescription,
        applicationDeadline: job.applicationDeadline
      })))
    );
  }

  // ✅ Student: Apply for job
  applyForJob(application: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/applications', application);
  }

  // ✅ Admin: View all jobs (raw from DB, not mapped)
  getAllAdminJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(`${this.adminBaseUrl}`);
  }

  // ✅ Admin: Update job
  updateJob(jobId: number, job: Job): Observable<Job> {
    return this.http.put<Job>(`${this.adminBaseUrl}/${jobId}`, job);
  }

  // ✅ Admin: Delete job
  deleteJob(jobId: number): Observable<any> {
    return this.http.delete(`${this.adminBaseUrl}/${jobId}`);
  }
}
