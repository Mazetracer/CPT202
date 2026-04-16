package com.heritage.platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record AdminPostReviewRequest(
        @NotBlank(message = "审核动作不能为空")
        String action,

        @Size(max = 255, message = "驳回原因不能超过255个字符")
        String reason
) {
}
