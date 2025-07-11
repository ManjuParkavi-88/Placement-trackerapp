package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.JobListing;
import com.example.Placement_Tracker.repository.JobListingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobListingServiceImpl implements JobListingService {

    @Autowired
    private JobListingRepository jobListingRepository;

    @Override
    public JobListing saveJob(JobListing jobListing) {
        return jobListingRepository.save(jobListing);
    }

    @Override
    public List<JobListing> getAllJobListingsFromAdminPostings() {
        return jobListingRepository.fetchJobListingsFromPostings();
    }
    @Override
    public void deleteJobById(int jobId) {
        jobListingRepository.deleteById(jobId);
    }
}
