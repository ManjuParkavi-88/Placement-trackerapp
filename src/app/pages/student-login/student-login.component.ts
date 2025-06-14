import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})
export class StudentLoginComponent {
  email = '';
  password = '';

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login() {
    const student = {
      email: this.email,
      password: this.password
    };

    this.http.post<any>('http://localhost:8080/students/login', student)
      .subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.toastr.success('Login successful!', 'Welcome');
          localStorage.setItem('student', JSON.stringify(response));
          this.router.navigate(['/student-dashboard']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.toastr.error('Invalid credentials', 'Login Failed');
        }
      });
  }
}
