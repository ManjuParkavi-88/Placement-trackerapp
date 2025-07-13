package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.AdminDetails;
import com.example.Placement_Tracker.repository.AdminDetailsRepository;
import com.example.Placement_Tracker.service.AdminDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
@CrossOrigin(origins = "*")
public class AdminDetailsController {

    @Autowired
    private AdminDetailsService adminDetailsService;
    
    @Autowired
    private AdminDetailsRepository adminRepo;

    // Get all admins2
    @GetMapping
    public List<AdminDetails> getAllAdmins() {
        return adminDetailsService.getAllAdmins();
    }

    // Get admin2 by ID
    @GetMapping("/{id}")
    public AdminDetails getAdminById(@PathVariable int id) {
        return adminDetailsService.getAdminById(id);
    }

    // Get admin2 by email
    @GetMapping("/email/{email}")
    public AdminDetails getAdminByEmail(@PathVariable String email) {
        return adminDetailsService.getAdminByEmail(email);
    }

    // Create a new admin2
    @PostMapping
    public AdminDetails createAdmin(@RequestBody AdminDetails adminDetails) {
        return adminDetailsService.createAdmin(adminDetails);
    }

    // Update an admin2 by ID
    @PutMapping("/{id}")
    public AdminDetails updateAdmin(@PathVariable int id, @RequestBody AdminDetails updatedAdmin) {
        return adminDetailsService.updateAdmin(id, updatedAdmin);
    }

    // Delete an admin2 by ID
    @DeleteMapping("/{id}")
    public String deleteAdmin(@PathVariable int id) {
        adminDetailsService.deleteAdmin(id);
        return "Admin with ID " + id + " has been deleted successfully.";
    }
    @PostMapping("/login")
    public AdminDetails loginAdmin(@RequestBody AdminDetails loginRequest) {
        return adminDetailsService.loginAdmin(loginRequest.getEmail(), loginRequest.getPassword());
    }
    
    @PostMapping("/register")
    public ResponseEntity<AdminDetails> register(@RequestBody AdminDetails admin) {
        AdminDetails saved = adminRepo.save(admin); // ✅ FIXED
        return ResponseEntity.ok(saved);
    }
}
