package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.JobPosting;
import com.example.Placement_Tracker.service.AdminJobPostingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/job-postings")
@CrossOrigin(origins = "*")
public class AdminJobPostingsController {

    @Autowired
    private AdminJobPostingsService adminJobPostingsService;

    // Get all job postings
    @GetMapping
    public List<JobPosting> getAllJobPostings() {
        return adminJobPostingsService.getAllJobPostings();
    }

    // Get a job posting by ID
    @GetMapping("/{id}")
    public JobPosting getJobPostingById(@PathVariable int id) {
        return adminJobPostingsService.getJobPostingById(id);
    }

    // Create a new job posting
    @PostMapping
    public JobPosting createJobPosting(@RequestBody JobPosting jobPosting) {
        return adminJobPostingsService.createJobPosting(jobPosting);
    }

    // Update a job posting by ID
    @PutMapping("/{id}")
    public JobPosting updateJobPosting(@PathVariable int id, @RequestBody JobPosting updatedJobPosting) {
        return adminJobPostingsService.updateJobPosting(id, updatedJobPosting);
    }

    // Delete a job posting by ID
    @DeleteMapping("/{id}")
    public String deleteJobPosting(@PathVariable int id) {
        adminJobPostingsService.deleteJobPosting(id);
        return "Job posting with ID " + id + " has been deleted successfully.";
    }
}
