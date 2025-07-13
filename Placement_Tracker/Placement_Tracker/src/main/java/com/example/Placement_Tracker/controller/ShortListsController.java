package com.example.Placement_Tracker.controller;

import com.example.Placement_Tracker.model.ShortLists;
import com.example.Placement_Tracker.repository.ShortListsRepository;
import com.example.Placement_Tracker.service.ShortListsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shortlists")
@CrossOrigin(origins = "*")
public class ShortListsController {

    @Autowired
    private ShortListsRepository shortlistRepository;

    @Autowired
    private ShortListsService shortListsService; // ✅ Proper service injection

    // ✅ Get all shortlists
    @GetMapping
    public List<ShortLists> getAllShortlists() {
        return shortlistRepository.findAll();
    }

    // ✅ Create
    @PostMapping
    public ShortLists createShortlist(@RequestBody ShortLists shortlists) {
        return shortlistRepository.save(shortlists);
    }

    // ✅ Get by student ID
    @GetMapping("/student/{id}")
    public List<ShortLists> getByStudentId(@PathVariable Integer id) {
        return shortlistRepository.findByStudentId(id);
    }

    // ✅ Get by job ID
    @GetMapping("/job/{jobId}")
    public List<ShortLists> getByJobId(@PathVariable Integer jobId) {
        return shortlistRepository.findByJobListingJobId(jobId);
    }

    // ✅ Update
    @PutMapping("/{id}")
    public ShortLists updateShortlist(@PathVariable Integer id, @RequestBody ShortLists updated) {
        ShortLists shortlist = shortlistRepository.findById(id).orElseThrow();
        shortlist.setShortlisted(updated.getShortlisted());
        shortlist.setScheduleConfirmed(updated.getScheduleConfirmed());
        return shortlistRepository.save(shortlist);
    }

    // ✅ Delete
    @DeleteMapping("/{id}")
    public void deleteShortlist(@PathVariable Integer id) {
        shortlistRepository.deleteById(id);
    }

    // ✅ Confirm schedule
    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmSchedule(@PathVariable int id) {
        try {
            shortListsService.confirmSchedule(id); // ✅ This will now work
            return ResponseEntity.ok("Schedule confirmed.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }
}
