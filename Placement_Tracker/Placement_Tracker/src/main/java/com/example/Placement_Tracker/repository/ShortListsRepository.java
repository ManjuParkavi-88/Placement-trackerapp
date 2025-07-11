package com.example.Placement_Tracker.repository;

import com.example.Placement_Tracker.model.ShortLists;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ShortListsRepository extends JpaRepository<ShortLists, Integer> {
    List<ShortLists> findByStudentId(Integer studentId);
    List<ShortLists> findByJobListingJobId(Integer jobId);
}
