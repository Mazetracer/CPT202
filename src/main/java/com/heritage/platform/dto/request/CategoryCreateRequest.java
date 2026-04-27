package com.heritage.platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryCreateRequest(
        @NotBlank(message = "分类名称不能为空")
        @Size(max = 100, message = "分类名称不能超过100个字符")
        String name,

        @Size(max = 255, message = "分类描述不能超过255个字符")
        String description
) {
}
