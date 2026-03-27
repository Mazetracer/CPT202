package com.heritage.platform.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommentCreateRequest(
        @NotNull(message = "评论用户不能为空")
        Long authorId,

        @NotBlank(message = "评论内容不能为空")
        String content
) {
}
