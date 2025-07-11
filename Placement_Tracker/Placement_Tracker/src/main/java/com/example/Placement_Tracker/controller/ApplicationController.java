package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.Application;
import com.example.Placement_Tracker.dto.ApplicationViewDTO;
import com.example.Placement_Tracker.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.example.Placement_Tracker.model.Application.Status;
import static com.example.Placement_Tracker.model.Application.Response;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @PostMapping
    public Application addApplication(@RequestBody Application application) {
        return applicationService.saveApplication(application);
    }

    @GetMapping
    public List<Application> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/{id}")
    public Application getApplicationById(@PathVariable int id) {
        return applicationService.getApplicationById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteApplication(@PathVariable int id) {
        applicationService.deleteApplication(id);
    }

    // ✅ View all applications with job info (admin tab)
    @GetMapping("/admin/all")
    public List<ApplicationViewDTO> getAllApplicationsForAdmin() {
        return applicationService.getAllApplicationDTOs();
    }

    // ✅ View applications by studentId
    @GetMapping("/student/{studentId}")
    public List<ApplicationViewDTO> getApplicationsByStudentId(@PathVariable int studentId) {
        return applicationService.getApplicationsByStudentId(studentId);
    }

    // ✅ Update application status (e.g. Shortlisted)
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable int id, @RequestParam String status) {
        Application app = applicationService.getApplicationById(id);
        if (app == null) return ResponseEntity.notFound().build();

        try {
            app.setStatus(Status.valueOf(status));
            applicationService.saveApplication(app);
            return ResponseEntity.ok("Status updated to " + status);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid status value");
        }
    }

    // ✅ Send interview notification to all applications of a student
    @PutMapping("/interview-notification/{studentId}")
    public ResponseEntity<?> sendInterview(@PathVariable int studentId) {
        List<Application> apps = applicationService.getAllApplications().stream()
            .filter(a -> a.getStudentId() == studentId && a.getStatus() == Status.Shortlisted)
            .toList();

        if (apps.isEmpty()) {
            return ResponseEntity.badRequest().body("No shortlisted applications found for student " + studentId);
        }

        apps.forEach(app -> app.setInterviewNotification(true));
        applicationService.saveAllApplications(apps); // <-- make sure this method exists
        return ResponseEntity.ok("Interview notification sent for student " + studentId);
    }

    // ✅ Student responds to interview notification
    @PutMapping("/{id}/response")
    public ResponseEntity<?> updateResponse(@PathVariable int id, @RequestParam String response) {
        Application app = applicationService.getApplicationById(id);
        if (app == null) return ResponseEntity.notFound().build();

        try {
            app.setResponse(Response.valueOf(response));
            applicationService.saveApplication(app);
            return ResponseEntity.ok("Response saved: " + response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Invalid response value");
        }
    }
    
    @PutMapping("/{id}/shortlist")
    public ResponseEntity<Application> shortlistApplication(@PathVariable int id) {
        Application updated = applicationService.shortlistApplication(id);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }
}
