package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.Feedback;
import com.example.Placement_Tracker.repository.FeedbackRepository;
import com.example.Placement_Tracker.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/feedbacks")
@CrossOrigin
public class AdminFeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private FeedbackRepository feedbackRepository;

    @GetMapping
    public List<Feedback> getAllFeedbacks() {
        return feedbackService.getAllFeedback();
    }

    @GetMapping("/{id}")
    public Feedback getFeedbackById(@PathVariable int id) {
        return feedbackService.getFeedbackById(id);
    }

    @PutMapping("/{id}")
    public Feedback updateFeedback(@PathVariable int id, @RequestBody Feedback updatedFeedback) {
        return feedbackService.updateFeedback(id, updatedFeedback);
    }

    @DeleteMapping("/{id}")
    public void deleteFeedback(@PathVariable int id) {
        feedbackService.deleteFeedback(id);
    }

    @PostMapping("/feedback")
    public ResponseEntity<Feedback> saveFeedback(@RequestBody Feedback feedback) {
        Feedback saved = feedbackRepository.save(feedback);
        return ResponseEntity.ok(saved);
    }
}
