package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.Student;
import java.util.List;

public interface StudentService {
    Student saveStudent(Student student);
    List<Student> getAllStudents();
    public Student loginStudent(String email, String password);
    Student getStudentById(int id);
    void deleteStudent(int id);
}
