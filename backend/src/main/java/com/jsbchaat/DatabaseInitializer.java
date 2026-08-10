package com.jsbchaat;

import com.jsbchaat.model.*;
import com.jsbchaat.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Arrays;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final MenuItemRepository menuItemRepository;
    private final GalleryImageRepository galleryImageRepository;
    private final ReviewRepository reviewRepository;
    private final CateringInquiryRepository cateringInquiryRepository;
    private final PasswordEncoder passwordEncoder;

    public DatabaseInitializer(UserRepository userRepository,
                               MenuItemRepository menuItemRepository,
                               GalleryImageRepository galleryImageRepository,
                               ReviewRepository reviewRepository,
                               CateringInquiryRepository cateringInquiryRepository,
                               PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.menuItemRepository = menuItemRepository;
        this.galleryImageRepository = galleryImageRepository;
        this.reviewRepository = reviewRepository;
        this.cateringInquiryRepository = cateringInquiryRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // 1. Seed Admin User
        if (userRepository.count() == 0) {
            User admin = new User();
            admin.setUsername("admin");
            // Encrypted Admin@JSB1958
            admin.setPassword(passwordEncoder.encode("Admin@JSB1958"));
            admin.setRole("ROLE_ADMIN");
            userRepository.save(admin);
            System.out.println("Default admin created: admin / Admin@JSB1958");
        }

        // 2. Seed Menu Items
        if (menuItemRepository.count() == 0) {
            menuItemRepository.saveAll(Arrays.asList(
                new MenuItem("Pani Puri", "Crispy hollow puris filled with spiced potatoes, chickpeas, and filled with a refreshing mint-coriander and sweet tamarind water.", 80.0, "/images/pani_puri.jpg", "Puri", true),
                new MenuItem("Sukha Puri", "A dry preparation of crispy puris filled with potatoes, spiced powder, coriander, and fine sev.", 70.0, "/images/sukha_puri.jpg", "Puri", true),
                new MenuItem("Sev Puri", "Crispy flat puris topped with potatoes, onions, tomatoes, sweet & spicy chutneys, and a mountain of fine sev.", 90.0, "/images/sev_puri.png", "Puri", true),
                new MenuItem("Dahi Puri", "Puffed round puris stuffed with seasoned potatoes, sweet yogurt (dahi), sweet & spicy chutneys, topped with fine sev.", 100.0, "/images/dahi_puri.jpg", "Puri", true),
                new MenuItem("Sukha Bhel", "A dry mixture of puffed rice, sev, potatoes, onions, roasted peanuts, and spices.", 70.0, "/images/sukha_bhel.jpg", "Bhel", true),
                new MenuItem("Gila Bhel", "Puffed rice tossed with potatoes, onions, fresh coriander, and a rich mix of sweet, tangy, and spicy chutneys.", 80.0, "/images/gila_bhel.jpg", "Bhel", true),
                new MenuItem("Ragda Pattice", "Golden-fried potato patties served with a warm, spicy white pea gravy (ragda), chutneys, onions, and sev.", 110.0, "/images/ragda_pattice.jpg", "Ragda", true),
                new MenuItem("Dahi Papdi", "Crispy papdis topped with boiled potatoes, chickpeas, sweet yogurt, chutneys, and fine sev.", 100.0, "/images/dahi_papdi.jpg", "Specialty", true)
            ));
            System.out.println("Initial menu items seeded.");
        }

        // 3. Seed Gallery Images
        if (galleryImageRepository.count() == 0) {
            galleryImageRepository.saveAll(Arrays.asList(
                new GalleryImage("/images/kartik_aaryan.jpg", "Kartik Aaryan enjoying our pani puri at Juhu branch", "Customer"),
                new GalleryImage("/images/stall_queue.jpg", "Our legendary Juhu street stall (6 No Chaat Wala)", "Stall"),
                new GalleryImage("/images/catering_setup.jpg", "Elegant indoor catering counter display", "Event"),
                new GalleryImage("/images/catering_chef1.jpg", "Our master chef preparing delicious live chaat", "Event"),
                new GalleryImage("/images/catering_chef2.jpg", "Serving authentic street flavors at a private catering event", "Event"),
                new GalleryImage("/images/live_stall_video.mp4", "Our live street food stall video", "Stall"),
                new GalleryImage("/images/live_stall_video_2.mp4", "Authentic live chaat preparation video", "Food")
            ));
            System.out.println("Initial gallery images seeded.");
        }

        // 4. Seed Reviews (Approved)
        if (reviewRepository.count() == 0) {
            reviewRepository.saveAll(Arrays.asList(
                new Review("Amit Sharma", "9812345670", 5, "I have been coming to JSB Chaat (6 No Chaat Wala) since the 1980s. The flavor of the Sev Puri is exactly the same today. An absolute Mumbai treasure!", true, "CUSTOMER"),
                new Review("Priyanka Deshmukh", "9898765432", 5, "Best Pani Puri in Vile Parle! Extremely hygienic and the water has that perfect authentic tanginess. Proud customer!", true, "CUSTOMER"),
                new Review("Rohan Mehta", "9876543210", 4, "We hired JSB Chaat for our daughter's birthday party in Juhu. They set up a beautiful live stall. The kids and adults both loved the Ragda Pattice and Dahi Puri!", true, "PARTY"),
                new Review("Karan Johar (Corporate Event)", "9900112233", 5, "Hired them for our corporate Diwali meet. The authentic Mumbai style chaat was a huge hit among the team. Professional setup and very clean.", true, "PARTY"),
                new Review("Kalpesh Desai", "9000000001", 5, "Best bhel puri and paani puri joint in town. My go-to place for street food in Mumbai.", true, "CUSTOMER"),
                new Review("Anil Bajaj", "9000000002", 5, "Bholenath Sev Puri stall is a Street food outlet, i have been enjoying it's delicious Bhel, Sev Puri & Pani Puri since more then 40 year's. Best part is it's Quality of Chutneys, sweet and chilly.", true, "CUSTOMER"),
                new Review("Dipesh Zaveri", "9000000003", 5, "50 year old legacy. Good place for chaat cravings.", true, "CUSTOMER"),
                new Review("G G", "9000000004", 5, "One of the best chat stalls in the city, made in Bisleri water. Try the sevpuri toast samdwich here, and ofcourse pani puri, dahi puri and sev puri.", true, "CUSTOMER"),
                new Review("Sneh Patel", "9000000005", 5, "Super panipuri and sevpuri.", true, "CUSTOMER"),
                new Review("Kartik Kasat", "9000000006", 5, "Panipuri hits even for a non mumbaikar!", true, "CUSTOMER")
            ));
            System.out.println("Initial reviews seeded.");
        }

        // 5. Seed Catering Inquiries
        if (cateringInquiryRepository.count() == 0) {
            cateringInquiryRepository.saveAll(Arrays.asList(
                new CateringInquiry("Sneha Patil", "9876541230", "Wedding Reception", 150, LocalDate.now().plusMonths(2), "Looking to set up a live chaat counter with Pani Puri, Sev Puri, and Ragda Pattice for a evening function."),
                new CateringInquiry("Vikram Malhotra", "9112233445", "Corporate Event", 80, LocalDate.now().plusWeeks(3), "Need catering for our office anniversary party in Bandra West.")
            ));
            System.out.println("Initial catering inquiries seeded.");
        }
    }
}
