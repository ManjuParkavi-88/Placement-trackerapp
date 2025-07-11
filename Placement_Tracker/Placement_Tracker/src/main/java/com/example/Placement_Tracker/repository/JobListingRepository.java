package com.example.Placement_Tracker.repository;

import com.example.Placement_Tracker.model.JobListing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;

public interface JobListingRepository extends JpaRepository<JobListing, Integer> {

    @Query(value = """
        SELECT 
            jp.job_id, 
            jp.company AS company_name, 
            jp.job_role, 
            jp.job_description, 
            jp.application_deadline
        FROM a_job_postings jp
        """, nativeQuery = true)
    List<JobListing> fetchJobListingsFromPostings();
}
