package com.example.Placement_Tracker.model;

import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Integer feedbackId;

    @Column(name = "student_id", nullable = false)
    private Integer studentId;

    @Column(name = "application_id", nullable = false)
    private Integer applicationId;

    @Column(name = "company_name", length = 255)
    private String companyName;

    @Column(name = "job_role", length = 255)
    private String jobRole;

    @Temporal(TemporalType.DATE)
    private Date interviewDate;

    @Column(name = "interview_rounds", length = 255)
    private String interviewRounds;

    @Column(name = "difficulty_rating")
    private Integer difficultyRating;

    @Lob
    @Column(name = "experience")
    private String experience;

    @Lob
    @Column(name = "questions_asked")
    private String questionsAsked;

    @Lob
    @Column(name = "tips")
    private String tips;

    // ─── Getters & Setters ────────────────────────────────────────────────────

    public Integer getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Integer feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Integer getStudentId() {
        return studentId;
    }

    public void setStudentId(Integer studentId) {
        this.studentId = studentId;
    }

    public Integer getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(Integer applicationId) {
        this.applicationId = applicationId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public Date getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(Date interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getInterviewRounds() {
        return interviewRounds;
    }

    public void setInterviewRounds(String interviewRounds) {
        this.interviewRounds = interviewRounds;
    }

    public Integer getDifficultyRating() {
        return difficultyRating;
    }

    public void setDifficultyRating(Integer difficultyRating) {
        this.difficultyRating = difficultyRating;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }

    public String getQuestionsAsked() {
        return questionsAsked;
    }

    public void setQuestionsAsked(String questionsAsked) {
        this.questionsAsked = questionsAsked;
    }

    public String getTips() {
        return tips;
    }

    public void setTips(String tips) {
        this.tips = tips;
    }
}
