package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.InterviewSchedule;
import com.example.Placement_Tracker.repository.AdminInterviewScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminInterviewScheduleService {

    @Autowired
    private AdminInterviewScheduleRepository adminInterviewScheduleRepository;

    public List<InterviewSchedule> getAllSchedules() {
        return adminInterviewScheduleRepository.findAll();
    }

    public InterviewSchedule getScheduleById(int id) {
        return adminInterviewScheduleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Schedule not found for ID: " + id));
    }
    
    public List<InterviewSchedule> getSchedulesByStudentId(int studentId) {
        return adminInterviewScheduleRepository.findByStudentId(studentId);
    }

    public InterviewSchedule createSchedule(InterviewSchedule schedule) {
        return adminInterviewScheduleRepository.save(schedule);
    }

    public InterviewSchedule updateSchedule(int id, InterviewSchedule updatedSchedule) {
        InterviewSchedule existingSchedule = getScheduleById(id);
        existingSchedule.setJobId(updatedSchedule.getJobId());
        existingSchedule.setStudentId(updatedSchedule.getStudentId());
        existingSchedule.setDate(updatedSchedule.getDate());
        existingSchedule.setTime(updatedSchedule.getTime());
        existingSchedule.setVenue(updatedSchedule.getVenue());
        existingSchedule.setMode(updatedSchedule.getMode());
        existingSchedule.setLink(updatedSchedule.getLink());
        return adminInterviewScheduleRepository.save(existingSchedule);
    }

    public void deleteSchedule(int id) {
        adminInterviewScheduleRepository.deleteById(id);
    }
}
