package com.jsbchaat.controller;

import com.jsbchaat.model.Review;
import com.jsbchaat.service.ReviewService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // Public GET and POST endpoints
    @GetMapping("/reviews")
    public List<Review> getApprovedReviews() {
        return reviewService.getApprovedReviews();
    }

    @GetMapping("/reviews/type/{type}")
    public List<Review> getApprovedReviewsByType(@PathVariable String type) {
        return reviewService.getApprovedReviewsByType(type);
    }

    @PostMapping("/reviews")
    public ResponseEntity<Review> submitReview(@RequestBody Review review) {
        if (review.getRating() == null || review.getRating() < 1 || review.getRating() > 5) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok(reviewService.submitReview(review));
    }

    // Admin endpoints
    @GetMapping("/admin/reviews")
    public List<Review> getAllReviewsForAdmin() {
        return reviewService.getAllReviewsForAdmin();
    }

    @PutMapping("/admin/reviews/{id}/approve")
    public ResponseEntity<Review> approveReview(
            @PathVariable Long id,
            @RequestParam("approved") boolean approved) {
        return ResponseEntity.ok(reviewService.approveReview(id, approved));
    }

    @DeleteMapping("/admin/reviews/{id}")
    public ResponseEntity<?> deleteReview(@PathVariable Long id) {
        reviewService.deleteReview(id);
        return ResponseEntity.ok().build();
    }
}
