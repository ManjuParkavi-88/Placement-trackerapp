package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.JobListing;

import java.util.List;

public interface JobListingService {
    JobListing saveJob(JobListing jobListing);
    List<JobListing> getAllJobListingsFromAdminPostings();
    void deleteJobById(int jobId);
}

