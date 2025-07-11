package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.InterviewSchedule;
import com.example.Placement_Tracker.service.AdminInterviewScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/interview-schedules")
@CrossOrigin(origins = "*")
public class AdminInterviewScheduleController {

    @Autowired
    private AdminInterviewScheduleService adminInterviewScheduleService;

    // Get all interview schedules
    @GetMapping
    public List<InterviewSchedule> getAllSchedules() {
        return adminInterviewScheduleService.getAllSchedules();
    }

    // Get interview schedule by ID
    @GetMapping("/{id}")
    public InterviewSchedule getScheduleById(@PathVariable int id) {
        return adminInterviewScheduleService.getScheduleById(id);
    }
    
    @GetMapping("/student/{studentId}")
    public List<InterviewSchedule> getSchedulesByStudent(@PathVariable int studentId) {
        return adminInterviewScheduleService.getSchedulesByStudentId(studentId);
    }

    // Create a new interview schedule
    @PostMapping
    public InterviewSchedule createSchedule(@RequestBody InterviewSchedule schedule) {
        return adminInterviewScheduleService.createSchedule(schedule);
    }

    // Update an interview schedule by ID
    @PutMapping("/{id}")
    public InterviewSchedule updateSchedule(@PathVariable int id, @RequestBody InterviewSchedule updatedSchedule) {
        return adminInterviewScheduleService.updateSchedule(id, updatedSchedule);
    }

    // Delete an interview schedule by ID
    @DeleteMapping("/{id}")
    public String deleteSchedule(@PathVariable int id) {
        adminInterviewScheduleService.deleteSchedule(id);
        return "Interview schedule with ID " + id + " has been deleted successfully.";
    }
}
