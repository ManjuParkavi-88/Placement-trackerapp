package com.example.Placement_Tracker.model;

import jakarta.persistence.*;

@Entity
@Table(name = "applications")
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private int applicationId;

    @Column(name = "student_id", nullable = false)
    private int studentId;

    @Column(name = "job_id", nullable = false)
    private int jobId;

    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('Applied', 'Withdrawn', 'Shortlisted')")
    private Status status = Status.Applied;

    @Column(nullable = false)
    private boolean interviewNotification = false;

    @Enumerated(EnumType.STRING)
    private Response response;

    // Enums
    public enum Status {
        Applied,
        Withdrawn,
        Shortlisted 
    }

    public enum Response {
        Accepted,
        Declined
    }

    // Getters and Setters
    public int getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(int applicationId) {
        this.applicationId = applicationId;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public boolean isInterviewNotification() {
        return interviewNotification;
    }

    public void setInterviewNotification(boolean interviewNotification) {
        this.interviewNotification = interviewNotification;
    }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }
}
