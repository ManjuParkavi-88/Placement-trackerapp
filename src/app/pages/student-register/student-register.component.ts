import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-register',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './student-register.component.html',
  styleUrls: ['./student-register.component.css']
})
export class StudentRegisterComponent {
  // Matching backend fields
  firstName = '';
  lastName = '';
  email = '';
  phoneNo = '';
  dob = '';
  collegeName = '';
  city = '';
  batch = '';
  department = '';
  rollNo = '';
  password = '';
  confirmPassword = '';

  maxDob = '';
  batchYears: number[] = [];

  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient) {
    const currentYear = 2025;
    this.maxDob = new Date(currentYear, 0, 1).toISOString().split('T')[0];
    this.batchYears = Array.from({ length: 20 }, (_, i) => currentYear - i);
    
  }

  register() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match!');
      return;
    }

    const studentData = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      phoneNo: this.phoneNo,
      dob: this.dob,
      collegeName: this.collegeName,
      city: this.city,
      batch: this.batch,
      department: this.department,
      rollNo: this.rollNo
    };

    this.http.post('http://localhost:8080/api/student/register', studentData)
      .subscribe({
        next: (res) => {
          this.toastr.success('Registration successful!');
        },
        error: (err) => {
          this.toastr.error('Registration failed!');
          console.error(err);
        }
      });
  }
}
