package com.example.Placement_Tracker.repository;

import com.example.Placement_Tracker.model.Feedback;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

	List<Feedback> findByStudentId(int studentId);
	Optional<Feedback> findByApplicationId(int applicationId);
}
