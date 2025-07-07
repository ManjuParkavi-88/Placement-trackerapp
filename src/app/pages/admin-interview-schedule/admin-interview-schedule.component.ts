import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { ApplicationDTO } from '../../models/application.model';
import { ApplicationsService } from '../../services/application.service';

type Mode = 'ONLINE' | 'OFFLINE';

interface ScheduleApplication extends ApplicationDTO {
  mode: Mode;
  date: string;
  time: string;
  link: string;
  venue: string;
  isScheduled?: boolean;
}

@Component({
  selector: 'app-admin-interview-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-interview-schedule.component.html',
  styleUrls: ['./admin-interview-schedule.component.css']
})
export class AdminInterviewScheduleComponent implements OnInit {

  applications: ScheduleApplication[] = []; // ✅ Use the extended type here

  constructor(
    private applicationService: ApplicationsService,
    private http: HttpClient,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchAcceptedShortlisted();
  }

  fetchAcceptedShortlisted(): void {
    this.applicationService.getAllApplications().subscribe({
      next: (apps) => {
        this.http.get<any[]>('http://localhost:8080/api/admin/interview-schedules').subscribe({
          next: (schedules) => {
            this.applications = apps
              .filter(app => app.status === 'Shortlisted' && app.response === 'Accepted')
              .map(app => {
                const matchedSchedule = schedules.find(
                  s => s.studentId === app.studentId && s.jobId === app.jobId
                );
  
                return {
                  ...app,
                  date: matchedSchedule?.date || '',
                  time: matchedSchedule?.time || '',
                  mode: matchedSchedule?.mode || 'ONLINE',
                  venue: matchedSchedule?.venue || '',
                  link: matchedSchedule?.link || '',
                  isScheduled: !!matchedSchedule
                };
              });
          },
          error: () => this.toastr.error('Failed to load interview schedules')
        });
      },
      error: () => this.toastr.error('Failed to fetch applications')
    });
  }
  
  schedule(app: ScheduleApplication): void {
    if (!app.date || !app.time || !app.venue || (app.mode === 'ONLINE' && !app.link)) {
      this.toastr.error('Please fill all required fields');
      return;
    }
  
    const payload = {
      studentId: app.studentId,
      jobId: app.jobId,
      date: app.date,
      time: app.time,
      mode: app.mode,
      link: app.link || '',
      venue: app.venue
    };
  
    this.http.post('http://localhost:8080/api/admin/interview-schedules', payload).subscribe({
      next: () => {
        this.toastr.success('Interview Scheduled');
        app.isScheduled = true;
      },
      error: () => this.toastr.error('Scheduling Failed')
    });
  }
  
}
  