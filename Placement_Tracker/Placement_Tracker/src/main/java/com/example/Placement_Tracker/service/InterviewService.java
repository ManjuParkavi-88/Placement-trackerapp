package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.Interview;
import java.util.List;

public interface InterviewService {
    Interview saveInterview(Interview interview);
    List<Interview> getAllInterviews();
    Interview getInterviewById(int id);
    void deleteInterview(int id);

    // Only show interviews for a given student
    List<Interview> getInterviewsByStudent(int studentId);
}
