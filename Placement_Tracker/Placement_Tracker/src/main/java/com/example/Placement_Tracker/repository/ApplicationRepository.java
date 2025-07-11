package com.example.Placement_Tracker.repository;

import com.example.Placement_Tracker.model.Application;
import com.example.Placement_Tracker.dto.ApplicationViewDTO; // ✅ import your DTO
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;           // ✅ required for @Query
import org.springframework.data.repository.query.Param;       // ✅ required for @Param
import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

	@Query("SELECT new com.example.Placement_Tracker.dto.ApplicationViewDTO(" +
		       "a.applicationId, a.studentId, a.jobId, a.status, a.response, j.jobRole, j.companyName, j.applicationDeadline, a.interviewNotification) " +
		       "FROM Application a JOIN JobPosting j ON a.jobId = j.jobId " +
		       "WHERE a.studentId = :studentId")
    List<ApplicationViewDTO> getApplicationsByStudentId(@Param("studentId") int studentId);
	
	@Query("SELECT new com.example.Placement_Tracker.dto.ApplicationViewDTO(" +
	           "a.applicationId, a.studentId, a.jobId, a.status, a.response, j.jobRole, j.companyName, j.applicationDeadline, a.interviewNotification) " +
	           "FROM Application a JOIN JobPosting j ON a.jobId = j.jobId")
	List<ApplicationViewDTO> getAllApplicationDTOs();
}