package com.heritage.platform.dto.response;

import com.heritage.platform.enums.PostStatus;

import java.time.LocalDateTime;

public record PostSummaryResponse(
        Long id,
        String title,
        String coverImageUrl,
        String heritageName,
        String region,
        PostStatus status,
        String authorName,
        String categoryName,
        Integer likeCount,
        Integer favoriteCount,
        Integer commentCount,
        LocalDateTime createdAt
) {
}
