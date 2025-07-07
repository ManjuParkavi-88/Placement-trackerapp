import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-job-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-job-post.component.html',
  styleUrls: ['./admin-job-post.component.css']
})
export class AdminJobPostComponent {
  job: any = {
    jobId: null,
    postedBy: null,
    title: '',
    companyName: '',
    requiredSkills: '',
    qualifications: '',
    applicationDeadline: '',
    jobDescription: '',
    jobRole: ''
  };

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  saveJob() {
    this.http.post('http://localhost:8080/api/admin/job-postings', this.job).subscribe({
      next: () => {
        this.toastr.success('Job posted successfully!');
        this.job = {}; // clear form
      },
      error: (err) => {
        console.error('Error posting job', err);
        this.toastr.error('Failed to post job');
      }
    });
  }
}
