import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../../services/job.service';
import { ApplicationsService } from '../../services/application.service';
import { Job } from '../../models/job.model';
import { Application } from '../../models/application.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  selectedTab: string = 'profile';
  student: any = {};
  jobs: Job[] = [];
  applications: Application[] = [];
  appliedJobs: Set<number> = new Set();
  interviewSchedules: any[] = []; // ✅ FIXED: Correctly placed outside any method

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private jobService: JobService,
    private applicationService: ApplicationsService
  ) {
    const studentData = localStorage.getItem('student');
    this.student = studentData ? JSON.parse(studentData) : {};
  }

  ngOnInit(): void {
    this.fetchJobs();
    this.fetchMyApplications();
  }

  // ✅ Fetch all jobs
  fetchJobs(): void {
    this.jobService.getAllJobs().subscribe({
      next: (data) => (this.jobs = data),
      error: (err) => {
        console.error('Failed to fetch jobs:', err);
        this.toastr.error('Could not load job listings.');
      }
    });
  }

  // ✅ Apply for a job
  apply(jobId: number): void {
    const application = {
      jobId: jobId,
      studentId: this.student.id
    };

    this.jobService.applyForJob(application).subscribe({
      next: () => {
        this.toastr.success('Applied successfully!');
        this.appliedJobs.add(jobId);
        this.fetchMyApplications();
      },
      error: () => {
        this.toastr.error('Failed to apply for job');
      }
    });
  }

  // ✅ Fetch student’s applications
  fetchMyApplications(): void {
    this.applicationService.getApplicationsByStudentId(this.student.id).subscribe({
      next: (data) => {
        this.applications = data;
        this.appliedJobs = new Set(data.map((app) => app.jobId));
      },
      error: () => this.toastr.error('Failed to fetch applications')
    });
  }

  // ✅ Confirm interview response (Accept/Decline)
  confirmInterview(applicationId: number): void {
    const confirmed = confirm('Do you want to schedule the interview?');
    const response = confirmed ? 'Accepted' : 'Declined';

    this.applicationService.updateInterviewResponse(applicationId, response).subscribe({
      next: () => {
        this.toastr[response === 'Accepted' ? 'success' : 'info'](
          response === 'Accepted'
            ? 'Interview response sent to admin.'
            : 'You declined the interview schedule.'
        );
        this.fetchMyApplications();
      },
      error: () => {
        this.toastr.error('Failed to update interview response');
      }
    });
  }

  // ✅ Switch tabs + load interview info on click
  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (tab === 'applications') {
      this.fetchMyApplications();
    } else if (tab === 'interview') {
      this.fetchInterviewInfo(); // ✅ Load interviews if "Interview Info" selected
    }
  }

  // ✅ Load interview schedules for the logged-in student
  fetchInterviewInfo(): void {
    this.applicationService.getInterviewSchedulesByStudentId(this.student.id).subscribe({
      next: (data) => this.interviewSchedules = data,
      error: () => this.toastr.error('Failed to load interview info')
    });
  }

  // ✅ Logout functionality
  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('student');
      this.toastr.success('Logged out successfully!');
      this.router.navigate(['/student-login']);
    }
  }

  // ✅ File upload for profile picture
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.student.photoUrl = reader.result;
        localStorage.setItem('student', JSON.stringify(this.student));
      };
      reader.readAsDataURL(file);
    } else {
      this.toastr.error('Please select a valid image file');
    }
  }
}
