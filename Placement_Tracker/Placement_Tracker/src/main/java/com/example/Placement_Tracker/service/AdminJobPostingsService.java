package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.JobPosting;
import com.example.Placement_Tracker.repository.AdminJobPostingsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminJobPostingsService {

    @Autowired
    private AdminJobPostingsRepository adminJobPostingsRepository;

    public List<JobPosting> getAllJobPostings() {
        return adminJobPostingsRepository.findAll();
    }

    public JobPosting getJobPostingById(int id) {
        return adminJobPostingsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job posting not found for ID: " + id));
    }

    public JobPosting createJobPosting(JobPosting jobPosting) {
        return adminJobPostingsRepository.save(jobPosting);
    }

    public JobPosting updateJobPosting(int id, JobPosting updatedJobPosting) {
        JobPosting existingJobPosting = getJobPostingById(id);
        existingJobPosting.setTitle(updatedJobPosting.getTitle());
        existingJobPosting.setCompanyName(updatedJobPosting.getCompanyName());
        existingJobPosting.setRequiredSkills(updatedJobPosting.getRequiredSkills());
        existingJobPosting.setQualifications(updatedJobPosting.getQualifications());
        existingJobPosting.setPostedBy(updatedJobPosting.getPostedBy());
        existingJobPosting.setApplicationDeadline(updatedJobPosting.getApplicationDeadline());
        existingJobPosting.setJobDescription(updatedJobPosting.getJobDescription());
        existingJobPosting.setJobRole(updatedJobPosting.getJobRole());
        return adminJobPostingsRepository.save(existingJobPosting);
    }

    public void deleteJobPosting(int id) {
        adminJobPostingsRepository.deleteById(id);
    }
}