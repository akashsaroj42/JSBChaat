package com.jsbchaat.repository;

import com.jsbchaat.model.CateringInquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CateringInquiryRepository extends JpaRepository<CateringInquiry, Long> {
    List<CateringInquiry> findAllByOrderByCreatedAtDesc();
}
