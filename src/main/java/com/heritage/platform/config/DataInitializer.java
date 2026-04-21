package com.heritage.platform.config;

import com.heritage.platform.entity.Category;
import com.heritage.platform.entity.Post;
import com.heritage.platform.entity.User;
import com.heritage.platform.enums.UserRole;
import com.heritage.platform.repository.CategoryRepository;
import com.heritage.platform.repository.PostRepository;
import com.heritage.platform.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PostRepository postRepository;
    private final PasswordEncoder passwordEncoder;
    @Value("${app.seed.sample-posts:false}")
    private boolean seedSamplePosts;

    public DataInitializer(
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            PostRepository postRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.postRepository = postRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            userRepository.save(new User(
                    "admin",
                    passwordEncoder.encode("admin123"),
                    "平台管理员",
                    null,
                    UserRole.ADMIN,
                    Boolean.TRUE
            ));
        }

        if (categoryRepository.count() == 0) {
            categoryRepository.saveAll(List.of(
                    Category.create("传统技艺", "手工艺、织染、雕刻等"),
                    Category.create("传统戏曲", "戏曲、曲艺、说唱艺术"),
                    Category.create("古建筑", "古城、古桥、古园林与历史建筑"),
                    Category.create("民俗节庆", "节日仪式、民间风俗与庆典")
            ));
        }

        if (seedSamplePosts && postRepository.count() == 0) {
            seedSamplePublishedPosts();
        }
    }

    private void seedSamplePublishedPosts() {
        List<User> users = userRepository.findAll();
        List<Category> categories = categoryRepository.findAll();
        if (users.isEmpty() || categories.isEmpty()) {
            return;
        }

        User reviewer = userRepository.findByUsername("admin").orElse(users.get(0));
        List<User> activeAuthors = users.stream()
                .filter(user -> Boolean.TRUE.equals(user.getActive()))
                .toList();
        if (activeAuthors.isEmpty()) {
            activeAuthors = List.of(reviewer);
        }

        Category craftsmanship = findCategory(categories, "传统技艺", 0);
        Category opera = findCategory(categories, "传统戏曲", 1);
        Category architecture = findCategory(categories, "古建筑", 2);
        Category festival = findCategory(categories, "民俗节庆", 3);

        postRepository.saveAll(List.of(
                buildPublishedPost(
                        "Field Notes from a Suzhou Embroidery Workshop",
                        "This sample article records stitching techniques, colour layering, and how heritage craft knowledge is shared between teachers and apprentices in a live studio setting.",
                        "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=1200&q=80",
                        "Suzhou Embroidery",
                        "Suzhou, Jiangsu",
                        activeAuthors.get(0 % activeAuthors.size()),
                        craftsmanship,
                        reviewer
                ),
                buildPublishedPost(
                        "Reading Gesture and Costume in Kunqu Performance",
                        "This sample article gives the homepage a published opera story with enough detail for search, category filtering, and article preview cards during local development.",
                        "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
                        "Kunqu Opera",
                        "Suzhou, Jiangsu",
                        activeAuthors.get(1 % activeAuthors.size()),
                        opera,
                        reviewer
                ),
                buildPublishedPost(
                        "How Covered Bridge Carpentry Preserves Local Building Memory",
                        "This sample article focuses on timber joints, repair practice, and the architectural knowledge embedded in historic bridges and community building traditions.",
                        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=80",
                        "Covered Bridge Carpentry",
                        "Wenzhou, Zhejiang",
                        activeAuthors.get(2 % activeAuthors.size()),
                        architecture,
                        reviewer
                ),
                buildPublishedPost(
                        "Lantern Processions and Night Ritual in the Old City",
                        "This sample article captures festival routes, local participation, and the seasonal atmosphere that makes community celebration visible on the public homepage.",
                        "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1200&q=80",
                        "Lantern Festival Procession",
                        "Quanzhou, Fujian",
                        activeAuthors.get(3 % activeAuthors.size()),
                        festival,
                        reviewer
                )
        ));
    }

    private Category findCategory(List<Category> categories, String expectedName, int fallbackIndex) {
        Optional<Category> match = categories.stream()
                .filter(category -> expectedName.equals(category.getName()))
                .findFirst();
        if (match.isPresent()) {
            return match.get();
        }
        return categories.get(Math.min(fallbackIndex, categories.size() - 1));
    }

    private Post buildPublishedPost(
            String title,
            String content,
            String coverImageUrl,
            String heritageName,
            String region,
            User author,
            Category category,
            User reviewer
    ) {
        Post post = Post.create(title, content, coverImageUrl, heritageName, region, author, category);
        post.submitForReview();
        post.approve(reviewer);
        return post;
    }
}
