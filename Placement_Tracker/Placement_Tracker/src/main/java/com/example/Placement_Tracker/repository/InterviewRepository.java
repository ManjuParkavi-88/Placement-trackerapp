package com.example.Placement_Tracker.repository;

import com.example.Placement_Tracker.model.Interview;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewRepository extends JpaRepository<Interview, Integer> {
	List<Interview> findByApplicationIdIn(List<Integer> appIds);
}
