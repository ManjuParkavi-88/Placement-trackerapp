import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-feedback-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-feedback-list.component.html',
  styleUrls: ['./admin-feedback-list.component.css']
})
export class AdminFeedbackListComponent implements OnInit {
  interviewShortlists: any[] = [];
  feedbackList: any[] = [];

  selectedFeedback: any = null;
  selectedTab: string = 'interview'; // default tab

  constructor(private adminService: AdminService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.loadInterviewShortlistData();
    this.fetchFeedbacks();
  }

  loadInterviewShortlistData(): void {
    this.adminService.getInterviewShortlistDetails().subscribe({
      next: (data) => this.interviewShortlists = data,
      error: () => this.toastr.error('Failed to load interview & shortlist data')
    });
  }

  fetchFeedbacks(): void {
    this.adminService.getAllFeedbacks().subscribe({
      next: (data) => (this.feedbackList = data),
      error: () => alert('Failed to load feedbacks.')
    });
  }

  editFeedback(fb: any): void {
    this.selectedFeedback = { ...fb }; // clone object
  }

  saveFeedback(): void {
    if (!this.selectedFeedback || !this.selectedFeedback.feedbackId) return;

    this.adminService.updateFeedback(this.selectedFeedback.feedbackId, this.selectedFeedback).subscribe({
      next: () => {
        alert('Feedback updated!');
        this.selectedFeedback = null;
        this.fetchFeedbacks(); // refresh
      },
      error: () => alert('Failed to update feedback.')
    });
  }

  deleteFeedback(id: number): void {
    if (!confirm('Are you sure you want to delete this feedback?')) return;

    this.adminService.deleteFeedback(id).subscribe({
      next: () => {
        alert('Feedback deleted!');
        this.fetchFeedbacks();
      },
      error: () => alert('Failed to delete feedback.')
    });
  }

  switchTab(tab: string): void {
    this.selectedTab = tab;
  }
}
