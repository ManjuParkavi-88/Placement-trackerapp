// src/app/pages/admin-dashboard/admin-dashboard.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

// Absolute imports off of src/
import { AdminStudentComponent } from '../admin-student/admin-student.component';
import { AdminJobPostComponent } from '../admin-job-post/admin-job-post.component';
import { AdminJobListComponent } from '../admin-job-list/admin-job-list.component';
import { AdminApplicationReviewComponent } from '../admin-application-review/admin-application-review.component';
import { AdminInterviewScheduleComponent } from '../admin-interview-schedule/admin-interview-schedule.component';
import { AdminFeedbackListComponent } from '../admin-feedback-list/admin-feedback-list.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    AdminStudentComponent,
    AdminJobPostComponent,
    AdminJobListComponent,
    AdminApplicationReviewComponent,
    AdminInterviewScheduleComponent,
    AdminFeedbackListComponent
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  selectedTab: 'students'|'postJob'|'viewJobs'|'applications'|'schedule'|'feedbacks' = 'students';
  admin: any = {};

  constructor(private router: Router) {
    const stored = localStorage.getItem('admin');
    this.admin = stored ? JSON.parse(stored) : {};
  }

  select(tab: typeof this.selectedTab) {
    this.selectedTab = tab;
  }

  logout() {
    if (confirm('Logout?')) {
      localStorage.removeItem('admin');
      this.router.navigate(['/admin-login']);
    }
  }

  onFileSelected(evt: any) {
    const f = evt.target.files[0];
    if (f?.type?.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        this.admin.photoUrl = reader.result;
        localStorage.setItem('admin', JSON.stringify(this.admin));
      };
      reader.readAsDataURL(f);
    }
  }
}
