package com.jsbchaat.service;

import com.jsbchaat.model.Review;
import com.jsbchaat.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review submitReview(Review review) {
        review.setApproved(true); // Auto-approve reviews so they are immediately visible
        return reviewRepository.save(review);
    }

    public List<Review> getApprovedReviews() {
        return reviewRepository.findByApproved(true);
    }

    public List<Review> getApprovedReviewsByType(String type) {
        return reviewRepository.findByApprovedAndType(true, type);
    }

    public List<Review> getAllReviewsForAdmin() {
        return reviewRepository.findAllByOrderByIdDesc();
    }

    public Review approveReview(Long id, boolean approve) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + id));
        review.setApproved(approve);
        return reviewRepository.save(review);
    }

    public void deleteReview(Long id) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Review not found with id: " + id));
        reviewRepository.delete(review);
    }
}
