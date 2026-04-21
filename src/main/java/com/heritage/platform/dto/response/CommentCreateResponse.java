package com.heritage.platform.dto.response;

public record CommentCreateResponse(
        CommentResponse comment,
        Integer commentCount
) {
}
