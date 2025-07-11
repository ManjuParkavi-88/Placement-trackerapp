package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.dto.ApplicationViewDTO;
import com.example.Placement_Tracker.model.Application;

import java.util.List;

public interface ApplicationService {
    Application saveApplication(Application application);
    List<Application> getAllApplications();
    Application getApplicationById(int id);
    void deleteApplication(int id);
    Application updateApplication(int id, Application updatedApplication);

    List<ApplicationViewDTO> getApplicationsByStudentId(int studentId);
    List<ApplicationViewDTO> getAllApplicationDTOs();  // <- Add this too
    void saveAllApplications(List<Application> apps); 
    Application shortlistApplication(int id);// <- Only declaration
}
