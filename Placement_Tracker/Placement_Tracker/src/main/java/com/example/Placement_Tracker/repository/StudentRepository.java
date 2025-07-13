package com.example.Placement_Tracker.repository;

import com.example.Placement_Tracker.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
	Student findByEmailAndPassword(String email, String password);
}
