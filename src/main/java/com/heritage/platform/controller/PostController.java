package com.heritage.platform.controller;

import com.heritage.platform.common.ApiResponse;
import com.heritage.platform.dto.request.CommentCreateRequest;
import com.heritage.platform.dto.request.PostCreateRequest;
import com.heritage.platform.dto.response.CommentResponse;
import com.heritage.platform.dto.response.PostDetailResponse;
import com.heritage.platform.dto.response.PostSummaryResponse;
import com.heritage.platform.service.PostService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping
    public ApiResponse<List<PostSummaryResponse>> listAll() {
        return ApiResponse.success(postService.listAll());
    }

    @GetMapping("/{postId}")
    public ApiResponse<PostDetailResponse> getDetail(@PathVariable Long postId) {
        return ApiResponse.success(postService.getDetail(postId));
    }

    @PostMapping
    public ApiResponse<PostDetailResponse> create(@Valid @RequestBody PostCreateRequest request) {
        return ApiResponse.success("文章发布成功", postService.create(request));
    }

    @PostMapping("/{postId}/comments")
    public ApiResponse<CommentResponse> addComment(
            @PathVariable Long postId,
            @Valid @RequestBody CommentCreateRequest request
    ) {
        return ApiResponse.success("评论发布成功", postService.addComment(postId, request));
    }
}
