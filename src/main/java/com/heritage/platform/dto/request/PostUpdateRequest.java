package com.heritage.platform.dto.request;

import com.heritage.platform.validation.Utf8ByteSize;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record PostUpdateRequest(
        @NotBlank(message = "A title is required.")
        @Utf8ByteSize(max = 150, message = "Title cannot exceed 150 UTF-8 bytes.")
        String title,

        @NotBlank(message = "Story text cannot be empty.")
        @Utf8ByteSize(max = 60000, message = "Story text cannot exceed 60000 UTF-8 bytes.")
        String content,

        @NotNull(message = "Please choose a collection.")
        Long categoryId,

        @Size(max = 255, message = "Cover image URL cannot exceed 255 characters.")
        String coverImageUrl,

        @Size(max = 100, message = "Heritage item name cannot exceed 100 characters.")
        String heritageName,

        @Size(max = 100, message = "Region cannot exceed 100 characters.")
        String region,

        List<String> imageUrls
) {
}
