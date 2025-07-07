import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private toastr: ToastrService, private adminService: AdminAuthService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match!');
      return;
    }

    const adminData = {
      firstName: this.firstName, 
      lastName:this.lastName,
      email: this.email,
      password: this.password
    };

    this.adminService.registerAdmin(adminData).subscribe({
      next: () => {
        this.toastr.success('Registration successful!');
        this.router.navigate(['/admin-login']);
      },
      error: () => this.toastr.error('Registration failed!')
    });
  }
}
