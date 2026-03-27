package com.heritage.platform.config;

import com.heritage.platform.entity.Category;
import com.heritage.platform.entity.User;
import com.heritage.platform.enums.UserRole;
import com.heritage.platform.repository.CategoryRepository;
import com.heritage.platform.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final PasswordEncoder passwordEncoder;

    public DataInitializer(UserRepository userRepository, CategoryRepository categoryRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
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
    }
}
