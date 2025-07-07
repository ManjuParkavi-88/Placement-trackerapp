import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-job-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-job-list.component.html',
  styleUrls: ['./admin-job-list.component.css']
})
export class AdminJobListComponent implements OnInit {
  jobs: Job[] = [];
  editingJob: Job | null = null;

  constructor(
    private jobService: JobService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.fetchJobs();
  }

  fetchJobs(): void {
    this.jobService.getAllAdminJobs().subscribe({
      next: (data) => {
        this.jobs = data;
        console.log('Jobs fetched:', this.jobs); // ✅ Helps debug if changes not visible
      },
      error: () => this.toastr.error('Failed to load jobs')
    });
  }

  editJob(job: Job): void {
    this.editingJob = { ...job };
  }

  cancelEdit(): void {
    this.editingJob = null;
  }

  saveEdit(): void {
    if (!this.editingJob) return;

    this.jobService.updateJob(this.editingJob.jobId, this.editingJob).subscribe({
      next: () => {
        this.toastr.success('Job updated!');
        this.fetchJobs(); // ✅ Refresh view with latest data
        this.editingJob = null;
      },
      error: () => this.toastr.error('Failed to update job')
    });
  }

  deleteJob(jobId: number): void {
    if (confirm('Are you sure you want to delete this job?')) {
      this.jobService.deleteJob(jobId).subscribe({
        next: () => {
      this.toastr.success('Job deleted');
      this.fetchJobs();
    },
      error: () => this.toastr.error('Failed to delete')
      });
    }
  }
}