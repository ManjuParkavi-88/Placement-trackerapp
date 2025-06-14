import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent {
  selectedTab: string = 'profile';
  student: any;

  constructor(private router: Router, private toastr: ToastrService) {
    const studentData = localStorage.getItem('student');
    this.student = studentData ? JSON.parse(studentData) : {};
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
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
