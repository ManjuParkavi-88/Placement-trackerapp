import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Needed for *ngIf, *ngFor
import { ApplicationsService } from '../../services/application.service';
import { ApplicationDTO } from '../../models/application.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  standalone: true, // ✅ Required for standalone
  selector: 'app-admin-application-review',
  templateUrl: './admin-application-review.component.html',
  styleUrls: ['./admin-application-review.component.css'],
  imports: [CommonModule, ToastrModule] // ✅ Import CommonModule here
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
      next: (data) => this.applications = data,
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
        this.loadApplications();
      },
      error: () => this.toastr.error("Failed to send notification")
    });
  }
}
