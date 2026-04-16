package com.heritage.platform.controller;

import com.heritage.platform.common.ApiResponse;
import com.heritage.platform.dto.response.MyPostSummaryResponse;
import com.heritage.platform.dto.response.PostDetailResponse;
import com.heritage.platform.enums.PostStatus;
import com.heritage.platform.service.PostService;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/my/posts")
public class MyPostController {

    private final PostService postService;

    public MyPostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ApiResponse<List<MyPostSummaryResponse>> listMyPosts(
            @RequestParam(required = false) PostStatus status
    ) {
        return ApiResponse.success(postService.listMyPosts(status));
    }

    @GetMapping("/{postId}")
    public ApiResponse<PostDetailResponse> getMyPostDetail(@PathVariable Long postId) {
        return ApiResponse.success(postService.getMyPostDetail(postId));
    }
}
