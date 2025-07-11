package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.Student;
import com.example.Placement_Tracker.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public Student saveStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student loginStudent(String email, String password) {
        return studentRepository.findByEmailAndPassword(email, password);
    }

    // ✅ Added
    @Override
    public Student getStudentById(int id) {
        return studentRepository.findById(id).orElse(null);
    }

    // ✅ Added
    @Override
    public void deleteStudent(int id) {
        studentRepository.deleteById(id);
    }
}
