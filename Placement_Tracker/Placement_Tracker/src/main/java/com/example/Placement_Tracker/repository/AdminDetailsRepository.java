package com.example.Placement_Tracker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.Placement_Tracker.model.AdminDetails;

import java.util.Optional;

@Repository
public interface AdminDetailsRepository extends JpaRepository<AdminDetails, Integer> {
    Optional<AdminDetails> findByEmail(String email);
}
