package com.heritage.platform.dto.response;

import com.heritage.platform.enums.ContributorApplicationStatus;
import com.heritage.platform.enums.UserRole;

import java.time.LocalDateTime;

public record AdminContributorApplicationResponse(
        Long id,
        Long applicantId,
        String applicantUsername,
        String applicantNickname,
        UserRole applicantRole,
        ContributorApplicationStatus status,
        String reviewerName,
        LocalDateTime createdAt,
        LocalDateTime reviewedAt,
        LocalDateTime updatedAt
) {
}
