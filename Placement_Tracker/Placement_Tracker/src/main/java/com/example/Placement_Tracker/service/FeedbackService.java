package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.Feedback;
import com.example.Placement_Tracker.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public Feedback getFeedbackById(int id) {
        return feedbackRepository.findById(id).orElse(null);
    }

    public void deleteFeedback(int id) {
        feedbackRepository.deleteById(id);
    }

    public List<Feedback> getFeedbacksByStudentId(int studentId) {
        return feedbackRepository.findByStudentId(studentId);
    }
    
    public boolean hasFeedbackForApplication(int applicationId) {
        return feedbackRepository.findByApplicationId(applicationId).isPresent();
    }
    public Feedback updateFeedback(int id, Feedback updatedFeedback) {
        Feedback existing = getFeedbackById(id);
        if (existing == null) return null;

        existing.setCompanyName(updatedFeedback.getCompanyName());
        existing.setJobRole(updatedFeedback.getJobRole());
        existing.setInterviewDate(updatedFeedback.getInterviewDate());
        existing.setInterviewRounds(updatedFeedback.getInterviewRounds());
        existing.setDifficultyRating(updatedFeedback.getDifficultyRating());
        existing.setExperience(updatedFeedback.getExperience());
        existing.setQuestionsAsked(updatedFeedback.getQuestionsAsked());
        existing.setTips(updatedFeedback.getTips());

        return feedbackRepository.save(existing);
    }
}
