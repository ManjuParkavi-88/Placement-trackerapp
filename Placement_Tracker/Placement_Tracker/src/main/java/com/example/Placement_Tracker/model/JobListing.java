package com.example.Placement_Tracker.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "job_listings")
public class JobListing {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id") // This maps the DB column name
    private int jobId;

    @Column(name = "company_name")
    private String company;

    @Column(name = "job_role")
    private String jobRole;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    @Column(name = "application_deadline")
    private Date applicationDeadline;

    
    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getJobDescription() {
        return jobDescription;
    }

    public void setJobDescription(String jobDescription) {
        this.jobDescription = jobDescription;
    }

    public Date getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(Date applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }
}
