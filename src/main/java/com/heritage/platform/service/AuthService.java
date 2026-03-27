package com.heritage.platform.service;

import com.heritage.platform.common.BadRequestException;
import com.heritage.platform.common.ResourceNotFoundException;
import com.heritage.platform.dto.request.LoginRequest;
import com.heritage.platform.dto.request.RegisterRequest;
import com.heritage.platform.dto.response.AuthResponse;
import com.heritage.platform.entity.User;
import com.heritage.platform.enums.UserRole;
import com.heritage.platform.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByUsername(request.username())) {
            throw new BadRequestException("用户名已存在");
        }

        User user = userRepository.save(new User(
                request.username(),
                passwordEncoder.encode(request.password()),
                request.nickname(),
                null,
                UserRole.USER,
                Boolean.TRUE
        ));

        return toResponse(user);
    }

    @Transactional(readOnly = true)
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));

        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new BadRequestException("账号已被禁用");
        }

        if (!passwordEncoder.matches(request.password(), user.getPasswordHash())) {
            throw new BadRequestException("用户名或密码错误");
        }

        return toResponse(user);
    }

    private AuthResponse toResponse(User user) {
        return new AuthResponse(user.getId(), user.getUsername(), user.getNickname(), user.getRole());
    }
}
