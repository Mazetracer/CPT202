package com.heritage.platform.service;

import com.heritage.platform.common.BadRequestException;
import com.heritage.platform.common.ResourceNotFoundException;
import com.heritage.platform.dto.request.AdminUserRoleUpdateRequest;
import com.heritage.platform.dto.response.AdminUserSummaryResponse;
import com.heritage.platform.entity.User;
import com.heritage.platform.enums.PostStatus;
import com.heritage.platform.enums.UserRole;
import com.heritage.platform.repository.PostRepository;
import com.heritage.platform.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AdminUserService {

    private final UserRepository userRepository;
    private final PostRepository postRepository;
    private final AuthContextService authContextService;

    public AdminUserService(
            UserRepository userRepository,
            PostRepository postRepository,
            AuthContextService authContextService
    ) {
        this.userRepository = userRepository;
        this.postRepository = postRepository;
        this.authContextService = authContextService;
    }

    @Transactional(readOnly = true)
    public List<AdminUserSummaryResponse> listUsers(String username, UserRole role) {
        authContextService.requireAdmin();

        String trimmedUsername = username == null ? "" : username.trim();
        boolean hasUsername = !trimmedUsername.isEmpty();

        List<User> users;
        if (role != null && hasUsername) {
            users = userRepository.findAllByRoleAndUsernameContainingIgnoreCaseOrderByUpdatedAtDesc(role, trimmedUsername);
        } else if (role != null) {
            users = userRepository.findAllByRoleOrderByUpdatedAtDesc(role);
        } else if (hasUsername) {
            users = userRepository.findAllByUsernameContainingIgnoreCaseOrderByUpdatedAtDesc(trimmedUsername);
        } else {
            users = userRepository.findAllByOrderByUpdatedAtDesc();
        }

        return users.stream().map(this::toSummary).toList();
    }

    @Transactional
    public AdminUserSummaryResponse updateRole(Long userId, AdminUserRoleUpdateRequest request) {
        authContextService.requireAdmin();

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));

        if (user.getRole() == UserRole.ADMIN) {
            throw new BadRequestException("不能修改管理员角色");
        }

        if (request.role() == UserRole.ADMIN) {
            throw new BadRequestException("不支持将用户设置为管理员");
        }

        if (request.role() == user.getRole()) {
            throw new BadRequestException("当前角色无需调整");
        }

        boolean validTransition = (user.getRole() == UserRole.USER && request.role() == UserRole.CONTRIBUTOR)
                || (user.getRole() == UserRole.CONTRIBUTOR && request.role() == UserRole.USER);
        if (!validTransition) {
            throw new BadRequestException("仅支持在普通用户与贡献者之间调整角色");
        }

        user.changeRole(request.role());
        return toSummary(user);
    }

    private AdminUserSummaryResponse toSummary(User user) {
        return new AdminUserSummaryResponse(
                user.getId(),
                user.getUsername(),
                user.getNickname(),
                user.getRole(),
                user.getActive(),
                postRepository.countByAuthorIdAndStatus(user.getId(), PostStatus.PUBLISHED),
                user.getUpdatedAt()
        );
    }
}
