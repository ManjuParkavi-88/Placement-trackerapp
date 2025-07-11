package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.AdminDetails;
import com.example.Placement_Tracker.repository.AdminDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDetailsService {

    @Autowired
    private AdminDetailsRepository adminDetailsRepository;

    public List<AdminDetails> getAllAdmins() {
        return adminDetailsRepository.findAll();
    }

    public AdminDetails getAdminById(int id) {
        return adminDetailsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found for ID: " + id));
    }

    public AdminDetails getAdminByEmail(String email) {
        return adminDetailsRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Admin not found for email: " + email));
    }

    public AdminDetails createAdmin(AdminDetails adminDetails) {
        return adminDetailsRepository.save(adminDetails);
    }

    public AdminDetails updateAdmin(int id, AdminDetails updatedAdmin) {
        AdminDetails existingAdmin = getAdminById(id);
        existingAdmin.setFirstName(updatedAdmin.getFirstName());
        existingAdmin.setLastName(updatedAdmin.getLastName());
        existingAdmin.setEmail(updatedAdmin.getEmail());
        existingAdmin.setPassword(updatedAdmin.getPassword());
        return adminDetailsRepository.save(existingAdmin);
    }

    public void deleteAdmin(int id) {
        adminDetailsRepository.deleteById(id);
    }
    public AdminDetails loginAdmin(String email, String password) {
        return adminDetailsRepository.findByEmail(email)
            .filter(admin -> admin.getPassword().equals(password))
            .orElseThrow(() -> new RuntimeException("Invalid email or password"));
    }
}
