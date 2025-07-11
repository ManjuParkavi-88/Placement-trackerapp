package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.JobListing;
import com.example.Placement_Tracker.service.JobListingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
@CrossOrigin
public class JobListingController {

    @Autowired
    private JobListingService jobListingService;

    @PostMapping
    public JobListing saveJob(@RequestBody JobListing jobListing) {
        return jobListingService.saveJob(jobListing);
    }

    @GetMapping("/listings")
    public List<JobListing> getAllJobListingsFromAdminPostings() {
        return jobListingService.getAllJobListingsFromAdminPostings();
    }
    @DeleteMapping("/{jobId}")
    public void deleteJob(@PathVariable int jobId) {
        jobListingService.deleteJobById(jobId);
    }
}
