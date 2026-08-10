package com.jsbchaat.repository;

import com.jsbchaat.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByApproved(Boolean approved);
    List<Review> findByApprovedAndType(Boolean approved, String type);
    List<Review> findAllByOrderByIdDesc();
}
