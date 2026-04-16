package com.heritage.platform.dto.response;

import com.heritage.platform.enums.PostStatus;

import java.time.LocalDateTime;
import java.util.List;

public record AdminPostDetailResponse(
        Long id,
        String title,
        String content,
        String coverImageUrl,
        String heritageName,
        String region,
        PostStatus status,
        Long authorId,
        String authorName,
        Long categoryId,
        String categoryName,
        Integer likeCount,
        Integer favoriteCount,
        Integer commentCount,
        List<String> imageUrls,
        List<CommentResponse> comments,
        String rejectReason,
        LocalDateTime submittedAt,
        LocalDateTime reviewedAt,
        Long reviewerId,
        String reviewerName,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
