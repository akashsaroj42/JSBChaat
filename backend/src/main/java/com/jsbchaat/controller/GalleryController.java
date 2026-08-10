package com.jsbchaat.controller;

import com.jsbchaat.model.GalleryImage;
import com.jsbchaat.service.CloudinaryService;
import com.jsbchaat.service.GalleryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class GalleryController {

    private final GalleryService galleryService;
    private final CloudinaryService cloudinaryService;

    public GalleryController(GalleryService galleryService, CloudinaryService cloudinaryService) {
        this.galleryService = galleryService;
        this.cloudinaryService = cloudinaryService;
    }

    // Public GET endpoints
    @GetMapping("/gallery")
    public List<GalleryImage> getAllImages() {
        return galleryService.getAllImages();
    }

    @GetMapping("/gallery/category/{category}")
    public List<GalleryImage> getImagesByCategory(@PathVariable String category) {
        return galleryService.getImagesByCategory(category);
    }

    // Admin POST/DELETE
    @PostMapping("/admin/gallery")
    public ResponseEntity<GalleryImage> addGalleryImage(
            @RequestParam(value = "caption", required = false) String caption,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image) throws IOException {

        if (image.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        String imageUrl = cloudinaryService.uploadFile(image);
        GalleryImage galleryImage = new GalleryImage(imageUrl, caption, category);

        return ResponseEntity.ok(galleryService.addImage(galleryImage));
    }

    @DeleteMapping("/admin/gallery/{id}")
    public ResponseEntity<?> deleteGalleryImage(@PathVariable Long id) {
        galleryService.deleteImage(id);
        return ResponseEntity.ok().build();
    }
}
