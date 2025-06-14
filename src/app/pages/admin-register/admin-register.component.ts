import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule, ToastrModule],
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private toastr: ToastrService, private adminService: AdminAuthService) {}

  register() {
    if (this.password !== this.confirmPassword) {
      this.toastr.error('Passwords do not match!');
      return;
    }
    const adminData = {
      name: this.name,
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
