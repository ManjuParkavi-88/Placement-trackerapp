package com.example.Placement_Tracker.dto;

import java.util.Date;
import com.example.Placement_Tracker.model.Application.Status;
import com.example.Placement_Tracker.model.Application.Response;

public class ApplicationViewDTO {

    private int applicationId;
    private int studentId;
    private int jobId; 
    private Status status;
    private Response response;
    private String jobRole;
    private String companyName;
    private Date applicationDeadline;
    private boolean interviewNotification;
    // ✅ Correct constructor
    public ApplicationViewDTO(int applicationId, int studentId, int jobId, Status status, Response response,
                              String jobRole, String companyName, Date applicationDeadline, boolean interviewNotification) {
        this.applicationId = applicationId;
        this.setJobId(jobId);
        this.studentId = studentId;
        this.status = status;
        this.response = response;
        this.jobRole = jobRole;
        this.companyName = companyName;
        this.applicationDeadline = applicationDeadline;
        this.interviewNotification=interviewNotification;
    }

    // ✅ Getters and setters
    public int getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(int applicationId) {
        this.applicationId = applicationId;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Response getResponse() {
        return response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public String getJobRole() {
        return jobRole;
    }

    public void setJobRole(String jobRole) {
        this.jobRole = jobRole;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public Date getApplicationDeadline() {
        return applicationDeadline;
    }

    public void setApplicationDeadline(Date applicationDeadline) {
        this.applicationDeadline = applicationDeadline;
    }

	public int getJobId() {
		return jobId;
	}

	public void setJobId(int jobId) {
		this.jobId = jobId;
	}
	
	public int getStudentId() { return studentId; }
	
	public void setStudentId(int StudentId) {
		this.studentId = StudentId;
	}
	
	public boolean isInterviewNotification() {
		return interviewNotification;
	}

	public void setInterviewNotification(boolean interviewNotification) {
		this.interviewNotification = interviewNotification;
	}
}
