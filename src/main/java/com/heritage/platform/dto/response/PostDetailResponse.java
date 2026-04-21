package com.heritage.platform.dto.response;

import com.heritage.platform.enums.PostStatus;

import java.time.LocalDateTime;
import java.util.List;

public record PostDetailResponse(
        Long id,
        String title,
        String content,
        String coverImageUrl,
        String heritageName,
        String region,
        PostStatus status,
        String authorName,
        String categoryName,
        Integer likeCount,
        Integer favoriteCount,
        Integer commentCount,
        Integer viewCount,
        List<String> imageUrls,
        List<CommentResponse> comments,
        LocalDateTime createdAt
) {
}
