package com.example.Placement_Tracker.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "student_details", uniqueConstraints = {
    @UniqueConstraint(columnNames = "roll_no"),
    @UniqueConstraint(columnNames = "phone_no")
})
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String email;

    @Column(name = "pass_word", nullable = false)
    private String password;

    @Column(name = "phone_no", nullable = false, unique = true)
    private String phoneNo;

    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date dob;

    private String department;

    @Column(name = "roll_no", unique = true)
    private String rollNo;

    private String batch;

    @Column(name = "college_name", nullable = false)
    private String collegeName;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String status = "IN PROCESS";

    public Student() {}

    // Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }

    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getPhoneNo() { return phoneNo; }
    public void setPhoneNo(String phoneNo) { this.phoneNo = phoneNo; }

    public Date getDob() { return dob; }
    public void setDob(Date dob) { this.dob = dob; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getRollNo() { return rollNo; }
    public void setRollNo(String rollNo) { this.rollNo = rollNo; }

    public String getBatch() { return batch; }
    public void setBatch(String batch) { this.batch = batch; }

    public String getCollegeName() { return collegeName; }
    public void setCollegeName(String collegeName) { this.collegeName = collegeName; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}