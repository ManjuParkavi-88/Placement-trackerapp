package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.Application;
import com.example.Placement_Tracker.dto.ApplicationViewDTO;
import com.example.Placement_Tracker.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.Placement_Tracker.model.ShortLists;
import com.example.Placement_Tracker.repository.ShortListsRepository;

import java.util.List;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;
    
    @Autowired
    private ShortListsRepository shortlistRepository;

    @Override
    public Application saveApplication(Application application) {
        return applicationRepository.save(application);
    }

    @Override
    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    @Override
    public Application getApplicationById(int id) {
        return applicationRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteApplication(int id) {
        applicationRepository.deleteById(id);
    }

    @Override
    public Application updateApplication(int id, Application updatedApplication) {
        Application existing = getApplicationById(id);
        if (existing == null) return null;

        existing.setJobId(updatedApplication.getJobId());
        existing.setStudentId(updatedApplication.getStudentId());
        existing.setStatus(updatedApplication.getStatus());
        existing.setInterviewNotification(updatedApplication.isInterviewNotification());
        existing.setResponse(updatedApplication.getResponse());

        return applicationRepository.save(existing);
    }

    // ✅ This is the new method returning DTO
    @Override
    public List<ApplicationViewDTO> getApplicationsByStudentId(int studentId) {
        return applicationRepository.getApplicationsByStudentId(studentId);
    }

    @Override
    public List<ApplicationViewDTO> getAllApplicationDTOs() {
        return applicationRepository.getAllApplicationDTOs();
    }

    @Override
    public void saveAllApplications(List<Application> apps) {
        applicationRepository.saveAll(apps);
    }
    
    @Override
    public Application shortlistApplication(int id) {
        Application app = getApplicationById(id);
        if (app == null) return null;

        app.setStatus(Application.Status.Shortlisted);
        app = applicationRepository.save(app);

        // ✅ Save into shortlists table
        ShortLists shortlist = new ShortLists();
        shortlist.setId(app.getStudentId()); // studentId field
        shortlist.setJobId(app.getJobId());  // jobId field
        shortlist.setShortlisted(true);
        shortlist.setScheduleConfirmed(false); // default

        shortlistRepository.save(shortlist);

        return app;
    }

}
