package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.Application;
import com.example.Placement_Tracker.model.Interview;
import com.example.Placement_Tracker.service.ApplicationService;
import com.example.Placement_Tracker.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
@CrossOrigin
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @Autowired
    private ApplicationService applicationService; // ✅ Add this line

    @GetMapping
    public List<Interview> getAllInterviews() {
        return interviewService.getAllInterviews();
    }

    @GetMapping("/{id}")
    public Interview getInterviewById(@PathVariable int id) {
        return interviewService.getInterviewById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteInterview(@PathVariable int id) {
        interviewService.deleteInterview(id);
    }

    @PostMapping
    public ResponseEntity<?> createInterview(@RequestBody Interview interview) {
        // ✅ Validate application
        Application app = applicationService.getApplicationById(interview.getApplicationId());

        if (app == null) {
            return ResponseEntity.badRequest().body("Invalid application ID");
        }

        if (app.getStatus() != Application.Status.Shortlisted || app.getResponse() != Application.Response.Accepted) {
            return ResponseEntity.badRequest().body("Interview can only be scheduled for shortlisted and accepted applications.");
        }

        Interview saved = interviewService.saveInterview(interview);
        return ResponseEntity.ok(saved);
    }
}
