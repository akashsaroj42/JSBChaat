package com.jsbchaat.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Map;
import java.util.UUID;

@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;
    private final String uploadLocalDir;

    public CloudinaryService(
            @Autowired(required = false) Cloudinary cloudinary,
            @Value("${upload.local-dir}") String uploadLocalDir) {
        this.cloudinary = cloudinary;
        this.uploadLocalDir = uploadLocalDir;
    }

    public String uploadFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file");
        }

        // If Cloudinary bean is initialized, use it
        if (cloudinary != null) {
            try {
                Map<?, ?> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                return uploadResult.get("secure_url").toString();
            } catch (Exception e) {
                // If Cloudinary fails for some reason (e.g. network/credentials issues), fall back to local
                System.err.println("Cloudinary upload failed, falling back to local storage: " + e.getMessage());
            }
        }

        // Local Storage Fallback
        File directory = new File(uploadLocalDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        // Generate unique name
        String originalFilename = file.getOriginalFilename();
        String extension = "";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }
        String fileName = UUID.randomUUID().toString() + extension;

        Path filePath = Paths.get(uploadLocalDir, fileName);
        Files.write(filePath, file.getBytes());

        // Return path prefix that maps to WebMvcConfig mapping
        return "/uploads/" + fileName;
    }
}
