package com.heritage.platform.dto.request;

import com.heritage.platform.enums.UserRole;
import jakarta.validation.constraints.NotNull;

public record AdminUserRoleUpdateRequest(
        @NotNull(message = "目标角色不能为空")
        UserRole role
) {
}
