import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-student',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-student.component.html',
  styleUrls: ['./admin-student.component.css']
})
export class AdminStudentComponent implements OnInit {
  students: any[] = [];

  constructor(private http: HttpClient) {}

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
}
