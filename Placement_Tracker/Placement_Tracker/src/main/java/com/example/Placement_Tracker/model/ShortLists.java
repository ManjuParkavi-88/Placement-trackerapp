package com.example.Placement_Tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shortlists")
public class ShortLists {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shortlist_id")
    private Integer shortlistId;

    @ManyToOne
    @JoinColumn(name = "ID")
    private Student student;

    @ManyToOne
    @JoinColumn(name = "job_id")
    private JobListing jobListing;

    @Column(name = "shortlisted")
    private Boolean shortlisted = false;

    @Column(name = "schedule_confirmed")
    private Boolean scheduleConfirmed = false;

    // Getters and setters
    public Integer getShortlistId() {
        return shortlistId;
    }

    public void setShortlistId(Integer shortlistId) {
        this.shortlistId = shortlistId;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public JobListing getJobListing() {
        return jobListing;
    }

    public void setJobListing(JobListing jobListing) {
        this.jobListing = jobListing;
    }

    public Boolean getShortlisted() {
        return shortlisted;
    }

    public void setShortlisted(Boolean shortlisted) {
        this.shortlisted = shortlisted;
    }

    public Boolean getScheduleConfirmed() {
        return scheduleConfirmed;
    }

    public void setScheduleConfirmed(Boolean scheduleConfirmed) {
        this.scheduleConfirmed = scheduleConfirmed;
    }

    public Integer getJobId() {
        return jobListing != null ? jobListing.getJobId() : null;
    }

    public void setJobId(Integer jobId) {
        if (this.jobListing == null) this.jobListing = new JobListing();
        this.jobListing.setJobId(jobId);
    }
    
    public Integer getId() {
        return student != null ? student.getId() : null;
    }

    public void setId(Integer id) {
        if (this.student == null) this.student = new Student();
        this.student.setId(id);
    }
}
