package com.example.Placement_Tracker.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "interviews")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "interview_id")
    private Integer interviewId;

    @Column(name = "application_id", nullable = false)
    private Integer applicationId;

    @Column(name = "interview_date", nullable = false)
    private LocalDate interviewDate;

    @Column(name = "interview_rounds", nullable = false)
    private String  interviewRounds;

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Integer getInterviewId() {
        return interviewId;
    }

    public void setInterviewId(Integer interviewId) {
        this.interviewId = interviewId;
    }

    public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Integer applicationId) {
        this.applicationId = applicationId;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String  getInterviewRounds() {
        return interviewRounds;
    }

    public void setInterviewRounds(String interviewRounds) {
        this.interviewRounds = interviewRounds;
    }
}
