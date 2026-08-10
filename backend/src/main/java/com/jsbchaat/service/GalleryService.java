package com.jsbchaat.service;

import com.jsbchaat.model.GalleryImage;
import com.jsbchaat.repository.GalleryImageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GalleryService {

    private final GalleryImageRepository galleryImageRepository;

    public GalleryService(GalleryImageRepository galleryImageRepository) {
        this.galleryImageRepository = galleryImageRepository;
    }

    public List<GalleryImage> getAllImages() {
        return galleryImageRepository.findAll();
    }

    public List<GalleryImage> getImagesByCategory(String category) {
        return galleryImageRepository.findByCategory(category);
    }

    public Optional<GalleryImage> getImageById(Long id) {
        return galleryImageRepository.findById(id);
    }

    public GalleryImage addImage(GalleryImage image) {
        return galleryImageRepository.save(image);
    }

    public void deleteImage(Long id) {
        GalleryImage image = galleryImageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Gallery image not found with id: " + id));
        galleryImageRepository.delete(image);
    }
}
