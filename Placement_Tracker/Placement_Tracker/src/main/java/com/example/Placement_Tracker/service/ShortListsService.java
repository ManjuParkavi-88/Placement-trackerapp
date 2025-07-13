package com.example.Placement_Tracker.service;

import com.example.Placement_Tracker.model.ShortLists;
import com.example.Placement_Tracker.repository.ShortListsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShortListsService {

    @Autowired
    private ShortListsRepository shortListsRepository;

    public List<ShortLists> getAllShortlists() {
        return shortListsRepository.findAll();
    }

    public ShortLists getShortlistById(int id) {
        return shortListsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shortlist not found for ID: " + id));
    }

    public ShortLists createShortlist(ShortLists shortlists) {
        return shortListsRepository.save(shortlists);
    }

    public ShortLists updateShortlist(int id, ShortLists updatedShortlist) {
        ShortLists existingShortlist = getShortlistById(id);
        existingShortlist.setScheduleConfirmed(updatedShortlist.getScheduleConfirmed());
        existingShortlist.setShortlisted(updatedShortlist.getShortlisted());
        existingShortlist.setJobId(updatedShortlist.getJobId());
        existingShortlist.setId(updatedShortlist.getId()); // Ensure student/user id is updated too
        return shortListsRepository.save(existingShortlist);
    }

    public void deleteShortlist(int id) {
        shortListsRepository.deleteById(id);
    }
    
    public void confirmSchedule(int id) {
        ShortLists shortlist = shortListsRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Shortlist not found for ID: " + id));

        shortlist.setScheduleConfirmed(true);
        shortListsRepository.save(shortlist);
    }
}
