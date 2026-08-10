package com.jsbchaat.service;

import com.jsbchaat.repository.CateringInquiryRepository;
import com.jsbchaat.repository.MenuItemRepository;
import com.jsbchaat.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AnalyticsService {

    private final MenuItemRepository menuItemRepository;
    private final ReviewRepository reviewRepository;
    private final CateringInquiryRepository cateringInquiryRepository;

    public AnalyticsService(MenuItemRepository menuItemRepository,
                            ReviewRepository reviewRepository,
                            CateringInquiryRepository cateringInquiryRepository) {
        this.menuItemRepository = menuItemRepository;
        this.reviewRepository = reviewRepository;
        this.cateringInquiryRepository = cateringInquiryRepository;
    }

    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        long totalMenuItems = menuItemRepository.count();
        long totalInquiries = cateringInquiryRepository.count();
        long totalReviews = reviewRepository.count();
        long pendingReviews = reviewRepository.findAll().stream().filter(r -> !r.getApproved()).count();
        long approvedReviews = totalReviews - pendingReviews;

        double averageRating = reviewRepository.findAll().stream()
                .filter(r -> r.getApproved())
                .mapToInt(r -> r.getRating())
                .average()
                .orElse(0.0);

        stats.put("totalMenuItems", totalMenuItems);
        stats.put("totalInquiries", totalInquiries);
        stats.put("totalReviews", totalReviews);
        stats.put("pendingReviews", pendingReviews);
        stats.put("approvedReviews", approvedReviews);
        stats.put("averageRating", Math.round(averageRating * 10.0) / 10.0);

        return stats;
    }
}
