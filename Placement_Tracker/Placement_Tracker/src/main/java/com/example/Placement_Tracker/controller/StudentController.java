package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.Student;
import com.example.Placement_Tracker.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    // ✅ Register student
    @PostMapping("/register")
    public Student registerStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // ✅ Login student
    @PostMapping("/login")
    public Student loginStudent(@RequestBody Student loginRequest) {
        return studentService.loginStudent(loginRequest.getEmail(), loginRequest.getPassword());
    }

    // ✅ Get all students
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    // ✅ Get a student by ID
    @GetMapping("/get/{id}")
    public Student getStudentById(@PathVariable int id) {
        return studentService.getStudentById(id);
    }

    // ✅ Delete a student by ID
    @DeleteMapping("/{id}")
    public String deleteStudent(@PathVariable int id) {
        studentService.deleteStudent(id);
        return "Student with ID " + id + " deleted successfully";
    }
    
    
}
