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
    this.applicationsService.getAdminApplications().subscribe(
      data => {
        this.applications = data.map(app => ({
          ...app,
          interviewNotification: !!app.interviewNotification
        }));
      },
      () => this.toastr.error('Failed to load applications')
    );
  }

 shortlist(id: number): void {
  this.applicationsService.shortlistApplication(id).subscribe(
    (response) => {
      if (response.status === 200) {
        this.toastr.success(`Application ${id} shortlisted`);
        this.loadApplications();
      } else {
        this.toastr.error('Shortlist failed: Unexpected response');
      }
    },
    () => this.toastr.error('Shortlist failed: Server error')
  );
}

notify(studentId: number): void {
  this.applicationsService.sendInterviewNotification(studentId).subscribe(
    (response) => {
      if (response.status === 200) {
        this.toastr.success('Notification sent');
        this.applications.forEach(app => {
          if (app.studentId === studentId) {
            app.interviewNotification = true;
          }
        });
      } else {
        this.toastr.error('Notification failed: Unexpected response');
      }
    },
    () => this.toastr.error('Notification failed: Server error')
  );
}}