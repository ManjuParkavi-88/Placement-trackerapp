import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsService } from '../../services/application.service';
import { ApplicationDTO } from '../../models/application.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  standalone: true,
  selector: 'app-admin-application-review',
  templateUrl: './admin-application-review.component.html',
  styleUrls: ['./admin-application-review.component.css'],
  imports: [CommonModule]
})
export class AdminApplicationReviewComponent implements OnInit {
  applications: ApplicationDTO[] = [];

  constructor(
    private applicationsService: ApplicationsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
  this.applicationsService.getAdminApplications().subscribe({
    next: (data) => {
      // Cleanly cast to boolean if needed
      this.applications = data.map(app => ({
        ...app,
        interviewNotification: !!app.interviewNotification
      }));
    },
    error: () => this.toastr.error("Failed to load applications")
  });
}

  shortlist(id: number): void {
    this.applicationsService.shortlistApplication(id).subscribe({
      next: () => {
        this.toastr.success("Shortlisted successfully");
        this.loadApplications();
      },
      error: () => this.toastr.error("Failed to update status")
    });
  }

  notify(studentId: number): void {
    this.applicationsService.sendInterviewNotification(studentId).subscribe({
      next: () => {
        this.toastr.success("Notification sent");

        // ✅ Directly update the UI without reload
        const app = this.applications.find(a => a.studentId === studentId);
        if (app) {
          app.interviewNotification = true;
        }
      },
      error: () => this.toastr.error("Failed to send notification")
    });
  }
}
