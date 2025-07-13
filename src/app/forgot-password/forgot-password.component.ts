import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { AdminAuthService } from '../services/admin-auth.service';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ToastrModule], // ✅ Fix here
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email = '';
  newPassword = '';
  role = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private studentService: StudentService,
    private adminAuthService: AdminAuthService
  ) {}

  ngOnInit(): void {
    this.role = this.route.snapshot.paramMap.get('role') || 'student';
  }

  submit(): void {
    const service = this.role === 'admin' ? this.adminAuthService : this.studentService;

    service.resetPassword(this.email, this.newPassword).subscribe({
      next: () => {
        this.toastr.success(`${this.role} password updated`);
        this.router.navigate([`/${this.role}-login`]);
      },
      error: () => {
        this.toastr.error('Email not found or reset failed');
      }
    });
  }
}
