import { Component, OnInit } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AdminService } from '../../services/admin.service';
import { ToastrService } from 'ngx-toastr'; // ✅ Only need ToastrService

@Component({
  selector: 'app-admin-student',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Removed ToastrModule
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {
  students: any[] = [];

  statusOptions: string[] = ['IN PROCESS', 'APPLIED', 'WITHDRAWN', 'PENDING', 'PLACED', 'REJECTED'];

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {
    this.fetchStudents();
  }

  fetchStudents(): void {
    this.http.get<any[]>('http://localhost:8080/api/student/all')
      .subscribe({
        next: (data) => this.students = data,
        error: () => console.error('Failed to load students')
      });
  }

  updateStatus(student: any): void {
    console.log('Updating:', student.id, student.status); // ✅ Debug log

    this.adminService.updateStudentStatus(student.id, student.status).subscribe({
      next: (res) => {
        if (res && res.status === 200) {
          this.toastr.success(`Status updated to ${student.status}`);
          this.fetchStudents(); // 🔁 Refresh table with latest data
        } else {
          this.toastr.error('Failed to update status');
        }
      },
      error: () => {
        this.toastr.error('Failed to update status');
      }
    });
  }
}
