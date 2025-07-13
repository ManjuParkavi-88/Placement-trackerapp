package com.example.Placement_Tracker.controller;
import com.example.Placement_Tracker.dto.ApplicationViewDTO;
import com.example.Placement_Tracker.model.Feedback;
import com.example.Placement_Tracker.model.InterviewSchedule;
import com.example.Placement_Tracker.repository.AdminInterviewScheduleRepository;
import com.example.Placement_Tracker.service.ApplicationService;
import com.example.Placement_Tracker.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private AdminInterviewScheduleRepository interviewScheduleRepository;

    @PostMapping("/feedbacks")
    public Feedback submitFeedback(@RequestBody Feedback feedback) {
        return feedbackService.saveFeedback(feedback);
    }

    @GetMapping("/feedbacks")
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/feedback/{id}")
    public Feedback getFeedbackById(@PathVariable int id) {
        return feedbackService.getFeedbackById(id);
    }

    @DeleteMapping("/feedback/{id}")
    public void deleteFeedback(@PathVariable int id) {
        feedbackService.deleteFeedback(id);
    }

    @GetMapping("/next-feedback/{studentId}")
    public ResponseEntity<?> getNextFeedbackEligible(@PathVariable int studentId) {
        List<ApplicationViewDTO> apps = applicationService.getApplicationsByStudentId(studentId);
        List<InterviewSchedule> interviews = interviewScheduleRepository.findByStudentId(studentId);

        for (ApplicationViewDTO app : apps) {
            if ("Shortlisted".equals(app.getStatus()) && "Accepted".equals(app.getResponse())) {
                boolean alreadySubmitted = feedbackService.hasFeedbackForApplication(app.getApplicationId());
                if (!alreadySubmitted) {
                    InterviewSchedule match = interviews.stream()
                        .filter(i -> i.getJobId() == app.getJobId())
                        .findFirst().orElse(null);

                    if (match != null) {
                        Map<String, Object> data = new HashMap<>();
                        data.put("applicationId", app.getApplicationId());
                        data.put("studentId", app.getStudentId());
                        data.put("companyName", app.getCompanyName()); // ✅ FIXED
                        data.put("jobRole", app.getJobRole());
                        data.put("interviewDate", match.getDate());
                        return ResponseEntity.ok(data);
                    }
                }
            }
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("No eligible feedback left to submit");
    }
}
