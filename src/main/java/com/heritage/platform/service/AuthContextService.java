package com.heritage.platform.service;

import com.heritage.platform.common.BadRequestException;
import com.heritage.platform.common.ForbiddenException;
import com.heritage.platform.common.ResourceNotFoundException;
import com.heritage.platform.entity.User;
import com.heritage.platform.enums.UserRole;
import com.heritage.platform.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Service
public class AuthContextService {

    private static final String USER_ID_HEADER = "X-User-Id";

    private final UserRepository userRepository;

    public AuthContextService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User requireActiveUser() {
        Long userId = resolveCurrentUserId();
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));

        if (!Boolean.TRUE.equals(user.getActive())) {
            throw new ForbiddenException("账号已被禁用");
        }

        return user;
    }

    public User requireAdmin() {
        User user = requireActiveUser();
        if (user.getRole() != UserRole.ADMIN) {
            throw new ForbiddenException("仅管理员可执行该操作");
        }
        return user;
    }

    private Long resolveCurrentUserId() {
        RequestAttributes attributes = RequestContextHolder.getRequestAttributes();
        if (!(attributes instanceof ServletRequestAttributes servletAttributes)) {
            throw new ForbiddenException("无法获取当前请求上下文");
        }

        HttpServletRequest request = servletAttributes.getRequest();
        String headerValue = request.getHeader(USER_ID_HEADER);
        if (headerValue == null || headerValue.isBlank()) {
            throw new ForbiddenException("缺少请求头: " + USER_ID_HEADER);
        }

        try {
            return Long.parseLong(headerValue);
        } catch (NumberFormatException ex) {
            throw new BadRequestException("请求头 X-User-Id 格式不正确");
        }
    }
}
