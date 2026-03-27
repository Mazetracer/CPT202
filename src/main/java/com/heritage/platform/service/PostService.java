package com.heritage.platform.service;

import com.heritage.platform.common.ResourceNotFoundException;
import com.heritage.platform.dto.request.CommentCreateRequest;
import com.heritage.platform.dto.request.PostCreateRequest;
import com.heritage.platform.dto.response.CommentResponse;
import com.heritage.platform.dto.response.PostDetailResponse;
import com.heritage.platform.dto.response.PostSummaryResponse;
import com.heritage.platform.entity.Comment;
import com.heritage.platform.entity.Post;
import com.heritage.platform.entity.PostImage;
import com.heritage.platform.entity.User;
import com.heritage.platform.repository.CommentRepository;
import com.heritage.platform.repository.PostRepository;
import com.heritage.platform.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final CommentRepository commentRepository;
    private final CategoryService categoryService;

    public PostService(
            PostRepository postRepository,
            UserRepository userRepository,
            CommentRepository commentRepository,
            CategoryService categoryService
    ) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
        this.commentRepository = commentRepository;
        this.categoryService = categoryService;
    }

    @Transactional
    public PostDetailResponse create(PostCreateRequest request) {
        User author = getUser(request.authorId());

        Post post = Post.create(
                request.title(),
                request.content(),
                request.coverImageUrl(),
                request.heritageName(),
                request.region(),
                author,
                categoryService.getById(request.categoryId())
        );

        List<String> imageUrls = request.imageUrls() == null ? List.of() : request.imageUrls();
        for (int i = 0; i < imageUrls.size(); i++) {
            String imageUrl = imageUrls.get(i);
            post.addImage(PostImage.create(imageUrl, null, i + 1, post));
        }

        Post savedPost = postRepository.save(post);
        return getDetail(savedPost.getId());
    }

    @Transactional(readOnly = true)
    public List<PostSummaryResponse> listAll() {
        return postRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toSummary)
                .toList();
    }

    @Transactional(readOnly = true)
    public PostDetailResponse getDetail(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("文章不存在"));

        List<CommentResponse> comments = commentRepository.findByPostIdOrderByCreatedAtAsc(postId).stream()
                .map(comment -> new CommentResponse(
                        comment.getId(),
                        comment.getContent(),
                        comment.getAuthor().getId(),
                        comment.getAuthor().getNickname(),
                        comment.getCreatedAt()
                ))
                .toList();

        List<String> imageUrls = post.getImages() == null
                ? new ArrayList<>()
                : post.getImages().stream().map(PostImage::getImageUrl).toList();

        return new PostDetailResponse(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getCoverImageUrl(),
                post.getHeritageName(),
                post.getRegion(),
                post.getStatus(),
                post.getAuthor().getNickname(),
                post.getCategory().getName(),
                post.getLikeCount(),
                post.getFavoriteCount(),
                post.getCommentCount(),
                imageUrls,
                comments,
                post.getCreatedAt()
        );
    }

    @Transactional
    public CommentResponse addComment(Long postId, CommentCreateRequest request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new ResourceNotFoundException("文章不存在"));
        User author = getUser(request.authorId());

        Comment comment = commentRepository.save(Comment.create(request.content(), author, post));

        post.increaseCommentCount();

        return new CommentResponse(
                comment.getId(),
                comment.getContent(),
                author.getId(),
                author.getNickname(),
                comment.getCreatedAt()
        );
    }

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("用户不存在"));
    }

    private PostSummaryResponse toSummary(Post post) {
        return new PostSummaryResponse(
                post.getId(),
                post.getTitle(),
                post.getCoverImageUrl(),
                post.getHeritageName(),
                post.getRegion(),
                post.getStatus(),
                post.getAuthor().getNickname(),
                post.getCategory().getName(),
                post.getLikeCount(),
                post.getFavoriteCount(),
                post.getCommentCount(),
                post.getCreatedAt()
        );
    }
}
