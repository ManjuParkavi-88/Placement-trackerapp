import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobService } from '../../services/job.service';
import { ApplicationsService } from '../../services/application.service';
import { Job } from '../../models/job.model';
import { Application } from '../../models/application.model';
import { FormsModule } from '@angular/forms';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  selectedTab: string = 'profile';
  student: any = {};
  jobs: Job[] = [];
  applications: Application[] = [];
  appliedJobs: Set<number> = new Set();
  interviewSchedules: any[] = [];
  interviewDetails: any = null;
  eligibleFeedbackQueue: any[] = [];

  feedback: any = {
    applicationId: 0,
    studentId: 0,
    companyName: '',
    jobRole: '',
    interviewDate: '',
    difficultyRating: 1,
    interviewRounds: '',
    questionsAsked: '',
    experience: '',
    tips: ''
  };

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private jobService: JobService,
    private applicationService: ApplicationsService
  ) {
    const studentData = localStorage.getItem('student');
    this.student = studentData ? JSON.parse(studentData) : null;
  }

  ngOnInit(): void {
  if (!this.student || !this.student.id) {
    this.router.navigate(['/student-login']);
    return;
  }
  this.fetchJobs();
  this.fetchMyApplications();
}

  fetchJobs(): void {
  this.jobService.getAllJobs().subscribe({
    next: (data: Job[]) => this.jobs = data,
    error: () => this.toastr.error('Could not load job listings.')
  });
}

  apply(jobId: number): void {
  const application = { jobId, studentId: this.student.id };
  this.jobService.applyForJob(application).subscribe({
    next: () => {
      this.toastr.success('Applied successfully!');
      this.appliedJobs.add(jobId);
      this.fetchMyApplications();
    },
    error: () => this.toastr.error('Failed to apply for job')
  });
}

  fetchMyApplications(): void {
  this.applicationService.getApplicationsByStudentId(this.student.id).subscribe({
    next: (data: Application[]) => {
      this.applications = data;
      this.appliedJobs = new Set(data.map(app => app.jobId));
    },
    error: () => this.toastr.error('Failed to fetch applications')
  });
}


  confirmInterview(applicationId: number): void {
  const confirmed = confirm('Do you want to schedule the interview?');
  const response = confirmed ? 'Accepted' : 'Declined';

  this.applicationService.updateInterviewResponse(applicationId, response).subscribe({
    next: (res) => {
      if (res && res.status === 200) {
        this.toastr.success(`Interview response: ${response}`);
        this.fetchMyApplications();
      } else {
        this.toastr.error('Failed to update interview response');
      }
    },
    error: () => this.toastr.error('Failed to update interview response')
  });
}

  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (tab === 'applications') {
      this.fetchMyApplications();
    } else if (tab === 'interview') {
      this.fetchInterviewInfo();
    } else if (tab === 'feedback') {
      this.populateFeedbackFromInterviews();
    }
  }

  fetchInterviewInfo(): void {
  this.applicationService.getInterviewSchedulesByStudentId(this.student.id).subscribe({
    next: (data: any[]) => this.interviewSchedules = data,
    error: () => this.toastr.error('Failed to load interview info')
  });
}

  populateFeedbackFromInterviews(): void {
  this.applicationService.getApplicationsByStudentId(this.student.id).subscribe({
    next: (apps: Application[]) => {
      this.applications = apps;
      this.applicationService.getInterviewSchedulesByStudentId(this.student.id).subscribe({
        next: (interviews: any[]) => {
          const eligible = apps.filter(
            app =>
              app.response === 'Accepted' &&
              app.status === 'Shortlisted' &&
              interviews.some(i => i.jobId === app.jobId)
          ).map(app => {
            const interview = interviews.find(i => i.jobId === app.jobId && i.studentId === app.studentId);
            return {
              applicationId: app.applicationId,
              studentId: this.student.id,
              companyName: app.companyName,
              jobRole: app.jobRole,
              interviewDate: interview?.date || ''
            };
          });

          this.eligibleFeedbackQueue = eligible;

          if (eligible.length > 0) {
            this.setFeedbackForm(eligible[0]);
          } else {
            this.interviewDetails = null;
          }
        },
        error: () => this.toastr.error('Failed to load interview info')
      });
    },
    error: () => this.toastr.error('Failed to fetch applications')
  });
}
  setFeedbackForm(data: any): void {
    this.feedback = {
      applicationId: data.applicationId,
      studentId: data.studentId,
      companyName: data.companyName,
      jobRole: data.jobRole,
      interviewDate: data.interviewDate,
      difficultyRating: 1,
      interviewRounds: '',
      questionsAsked: '',
      experience: '',
      tips: ''
    };

    this.interviewDetails = {
      companyName: data.companyName,
      jobRole: data.jobRole,
      interviewDate: data.interviewDate
    };
  }

submitFeedback(): void {
  this.applicationService.postStudentFeedback(this.feedback).subscribe({
    next: (res: HttpResponse<any>) => {
      if (res && res.status === 200) {
        this.toastr.success('Feedback submitted successfully!');
        this.eligibleFeedbackQueue.shift();
        if (this.eligibleFeedbackQueue.length > 0) {
          this.setFeedbackForm(this.eligibleFeedbackQueue[0]);
        } else {
          this.feedback = {
            applicationId: 0,
            studentId: 0,
            companyName: '',
            jobRole: '',
            interviewDate: '',
            difficultyRating: 1,
            interviewRounds: '',
            questionsAsked: '',
            experience: '',
            tips: ''
          };
          this.interviewDetails = null;
        }
      } else {
        this.toastr.error('Failed to submit feedback');
      }
    },
    error: () => this.toastr.error('Failed to submit feedback')
  });
}

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('student');
      this.toastr.success('Logged out successfully!');
      this.router.navigate(['/student-login']);
    }
  }

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
