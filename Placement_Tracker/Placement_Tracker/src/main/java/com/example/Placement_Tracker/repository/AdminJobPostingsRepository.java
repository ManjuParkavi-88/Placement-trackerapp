package com.example.Placement_Tracker.repository;

import com.example.Placement_Tracker.model.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminJobPostingsRepository extends JpaRepository<JobPosting, Integer> {
}
