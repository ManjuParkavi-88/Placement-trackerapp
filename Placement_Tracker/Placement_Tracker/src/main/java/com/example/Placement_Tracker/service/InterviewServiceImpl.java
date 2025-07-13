package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.Interview;
import com.example.Placement_Tracker.repository.InterviewRepository;
import com.example.Placement_Tracker.repository.ApplicationRepository;
import com.example.Placement_Tracker.model.Application;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InterviewServiceImpl implements InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private ApplicationRepository applicationRepository; // to filter by student & status

    @Override
    public Interview saveInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    @Override
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    @Override
    public Interview getInterviewById(int id) {
        return interviewRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteInterview(int id) {
        interviewRepository.deleteById(id);
    }

    @Override
    public List<Interview> getInterviewsByStudent(int studentId) {
        // Only include interviews whose application belongs to this student and is Shortlisted & Accepted
        List<Application> accepted = applicationRepository.findAll().stream()
            .filter(a -> a.getStudentId() == studentId
                      && a.getStatus() == Application.Status.Shortlisted
                      && a.getResponse() == Application.Response.Accepted)
            .collect(Collectors.toList());

        List<Integer> appIds = accepted.stream()
            .map(Application::getApplicationId)
            .collect(Collectors.toList());

        return interviewRepository.findAll().stream()
            .filter(i -> appIds.contains(i.getApplicationId()))
            .collect(Collectors.toList());
    }
}
