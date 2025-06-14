import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AdminAuthService } from '../../services/admin-auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private adminService: AdminAuthService
  ) {}

  login() {
    const loginData = { email: this.email, password: this.password };

    this.adminService.loginAdmin(loginData).subscribe({
      next: (admin) => {
        localStorage.setItem('admin', JSON.stringify(admin));
        this.toastr.success('Login successful!');
        this.router.navigate(['/admin-dashboard']);
      },
      error: () => this.toastr.error('Login failed. Check credentials.')
    });
  }
}
