package com.heritage.platform.repository;

import com.heritage.platform.entity.User;
import com.heritage.platform.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByUsername(String username);

    Optional<User> findByUsername(String username);

    List<User> findAllByOrderByUpdatedAtDesc();

    List<User> findAllByUsernameContainingIgnoreCaseOrderByUpdatedAtDesc(String username);

    List<User> findAllByRoleOrderByUpdatedAtDesc(UserRole role);

    List<User> findAllByRoleAndUsernameContainingIgnoreCaseOrderByUpdatedAtDesc(UserRole role, String username);
}
