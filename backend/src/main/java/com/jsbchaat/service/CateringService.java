package com.jsbchaat.service;

import com.jsbchaat.model.CateringInquiry;
import com.jsbchaat.repository.CateringInquiryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CateringService {

    private final CateringInquiryRepository cateringInquiryRepository;

    public CateringService(CateringInquiryRepository cateringInquiryRepository) {
        this.cateringInquiryRepository = cateringInquiryRepository;
    }

    public CateringInquiry submitInquiry(CateringInquiry inquiry) {
        return cateringInquiryRepository.save(inquiry);
    }

    public List<CateringInquiry> getAllInquiries() {
        return cateringInquiryRepository.findAllByOrderByCreatedAtDesc();
    }

    public void deleteInquiry(Long id) {
        CateringInquiry inquiry = cateringInquiryRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Inquiry not found with id: " + id));
        cateringInquiryRepository.delete(inquiry);
    }
}
