package com.jsbchaat.controller;

import com.jsbchaat.model.MenuItem;
import com.jsbchaat.service.CloudinaryService;
import com.jsbchaat.service.MenuService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
public class MenuController {

    private final MenuService menuService;
    private final CloudinaryService cloudinaryService;

    public MenuController(MenuService menuService, CloudinaryService cloudinaryService) {
        this.menuService = menuService;
        this.cloudinaryService = cloudinaryService;
    }

    // Public GET endpoints
    @GetMapping("/menu")
    public List<MenuItem> getActiveMenuItems() {
        return menuService.getActiveMenuItems();
    }

    @GetMapping("/menu/all")
    public List<MenuItem> getAllMenuItems() {
        return menuService.getAllMenuItems();
    }

    @GetMapping("/menu/{id}")
    public ResponseEntity<MenuItem> getMenuItemById(@PathVariable Long id) {
        return menuService.getMenuItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Admin POST/PUT/DELETE under /api/admin
    @PostMapping("/admin/menu")
    public ResponseEntity<MenuItem> createMenuItem(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam(value = "available", required = false) Boolean available,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        String imageUrl = null;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadFile(image);
        }

        MenuItem menuItem = new MenuItem(
                name,
                description,
                price,
                imageUrl != null ? imageUrl : "",
                category,
                available != null ? available : true
        );

        return ResponseEntity.ok(menuService.createMenuItem(menuItem));
    }

    @PutMapping("/admin/menu/{id}")
    public ResponseEntity<MenuItem> updateMenuItem(
            @PathVariable Long id,
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam(value = "available", required = false) Boolean available,
            @RequestParam(value = "imageUrl", required = false) String imageUrlParam,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        String imageUrl = imageUrlParam;
        if (image != null && !image.isEmpty()) {
            imageUrl = cloudinaryService.uploadFile(image);
        }

        MenuItem details = new MenuItem(
                name,
                description,
                price,
                imageUrl,
                category,
                available != null ? available : true
        );

        return ResponseEntity.ok(menuService.updateMenuItem(id, details));
    }

    @DeleteMapping("/admin/menu/{id}")
    public ResponseEntity<?> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.ok().build();
    }
}
