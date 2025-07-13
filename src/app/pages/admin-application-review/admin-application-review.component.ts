import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ApplicationsService } from '../../services/application.service';
import { ApplicationDTO } from '../../models/application.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-application-review',
  standalone: true,
  templateUrl: './admin-application-review.component.html',
  styleUrls: ['./admin-application-review.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    ToastrModule
    ]
})
export class AdminApplicationReviewComponent implements OnInit {
  applications: ApplicationDTO[] = [];

  constructor(
    private applicationsService: ApplicationsService, // ✅ Injected here
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationsService.getAdminApplications().subscribe({
      next: (data) => {
        this.applications = data;
      },
      error: () => {
        this.toastr.error('Failed to load applications');
      }
    });
  }

  shortlist(id: number): void {
    this.applicationsService.shortlistApplication(id).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.toastr.success(`Application ${id} shortlisted`);
          this.loadApplications();
        } else {
          this.toastr.error('Shortlisting failed');
        }
      },
      error: () => {
        this.toastr.error('Failed to update status');
      }
    });
  }

  notify(studentId: number): void {
    this.applicationsService.sendInterviewNotification(studentId).subscribe({
      next: (res: HttpResponse<any>) => {
        if (res.status === 200) {
          this.toastr.success('Notification sent');
        } else {
          this.toastr.error('Notification failed');
        }
      },
      error: () => {
        this.toastr.error('Error sending notification');
      }
    });
  }
}
