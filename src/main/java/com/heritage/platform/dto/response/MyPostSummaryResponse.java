package com.heritage.platform.dto.response;

import com.heritage.platform.enums.PostStatus;

import java.time.LocalDateTime;

public record MyPostSummaryResponse(
        Long id,
        String title,
        String coverImageUrl,
        String heritageName,
        String region,
        PostStatus status,
        String categoryName,
        String rejectReason,
        LocalDateTime submittedAt,
        LocalDateTime updatedAt,
        LocalDateTime createdAt
) {
}
