package com.jsbchaat.controller;

import com.jsbchaat.model.CateringInquiry;
import com.jsbchaat.service.CateringService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CateringController {

    private final CateringService cateringService;

    public CateringController(CateringService cateringService) {
        this.cateringService = cateringService;
    }

    // Public submission endpoint
    @PostMapping("/catering/inquiry")
    public ResponseEntity<CateringInquiry> submitInquiry(@RequestBody CateringInquiry inquiry) {
        if (inquiry.getName() == null || inquiry.getMobileNumber() == null ||
                inquiry.getEventType() == null || inquiry.getNumberOfGuests() == null ||
                inquiry.getEventDate() == null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(cateringService.submitInquiry(inquiry));
    }

    // Admin endpoints
    @GetMapping("/admin/catering")
    public List<CateringInquiry> getAllInquiries() {
        return cateringService.getAllInquiries();
    }

    @DeleteMapping("/admin/catering/{id}")
    public ResponseEntity<?> deleteInquiry(@PathVariable Long id) {
        cateringService.deleteInquiry(id);
        return ResponseEntity.ok().build();
    }
}
