package com.heritage.platform.entity;

import com.heritage.platform.enums.PostStatus;
import java.time.LocalDateTime;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import jakarta.persistence.Table;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "posts")
public class Post extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String title;

    @Lob
    @Column(nullable = false)
    private String content;

    @Column(length = 255)
    private String coverImageUrl;

    @Column(length = 100)
    private String heritageName;

    @Column(length = 100)
    private String region;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private PostStatus status = PostStatus.DRAFT;

    @Column(nullable = false)
    private Integer likeCount = 0;

    @Column(nullable = false)
    private Integer favoriteCount = 0;

    @Column(nullable = false)
    private Integer commentCount = 0;

    @Column(nullable = false)
    private Integer viewCount = 0;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;

    @Column(length = 255)
    private String rejectReason;

    private LocalDateTime submittedAt;

    private LocalDateTime reviewedAt;

    @OrderBy("sortOrder ASC")
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PostImage> images = new ArrayList<>();

    protected Post() {
    }

    public Post(String title, String content, String coverImageUrl, String heritageName, String region, User author, Category category) {
        this.title = title;
        this.content = content;
        this.coverImageUrl = coverImageUrl;
        this.heritageName = heritageName;
        this.region = region;
        this.author = author;
        this.category = category;
        this.status = PostStatus.DRAFT;
        this.likeCount = 0;
        this.favoriteCount = 0;
        this.commentCount = 0;
        this.viewCount = 0;
        this.images = new ArrayList<>();
    }

    public static Post create(String title, String content, String coverImageUrl, String heritageName, String region, User author, Category category) {
        return new Post(title, content, coverImageUrl, heritageName, region, author, category);
    }

    public void addImage(PostImage image) {
        images.add(image);
    }

    public void replaceImages(List<PostImage> newImages) {
        images.clear();
        if (newImages == null) {
            return;
        }
        newImages.forEach(this::addImage);
    }

    public void update(String title, String content, String coverImageUrl, String heritageName, String region, Category category) {
        this.title = title;
        this.content = content;
        this.coverImageUrl = coverImageUrl;
        this.heritageName = heritageName;
        this.region = region;
        this.category = category;
    }

    public void submitForReview() {
        this.status = PostStatus.PENDING_REVIEW;
        this.submittedAt = LocalDateTime.now();
        this.reviewedAt = null;
        this.reviewedBy = null;
        this.rejectReason = null;
    }

    public void approve(User reviewer) {
        this.status = PostStatus.PUBLISHED;
        this.reviewedAt = LocalDateTime.now();
        this.reviewedBy = reviewer;
        this.rejectReason = null;
    }

    public void reject(User reviewer, String reason) {
        this.status = PostStatus.REJECTED;
        this.reviewedAt = LocalDateTime.now();
        this.reviewedBy = reviewer;
        this.rejectReason = reason;
    }

    public void archive(User reviewer) {
        this.status = PostStatus.ARCHIVED;
        this.reviewedAt = LocalDateTime.now();
        this.reviewedBy = reviewer;
    }

    public void restore(User reviewer) {
        this.status = PostStatus.PUBLISHED;
        this.reviewedAt = LocalDateTime.now();
        this.reviewedBy = reviewer;
        this.rejectReason = null;
    }

    public void increaseCommentCount() {
        commentCount += 1;
    }

    public void increaseViewCount() {
        viewCount += 1;
    }

    public void increaseLikeCount() {
        likeCount += 1;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getCoverImageUrl() {
        return coverImageUrl;
    }

    public String getHeritageName() {
        return heritageName;
    }

    public String getRegion() {
        return region;
    }

    public PostStatus getStatus() {
        return status;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public Integer getFavoriteCount() {
        return favoriteCount;
    }

    public Integer getCommentCount() {
        return commentCount;
    }

    public Integer getViewCount() {
        return viewCount;
    }

    public User getAuthor() {
        return author;
    }

    public Category getCategory() {
        return category;
    }

    public User getReviewedBy() {
        return reviewedBy;
    }

    public String getRejectReason() {
        return rejectReason;
    }

    public LocalDateTime getSubmittedAt() {
        return submittedAt;
    }

    public LocalDateTime getReviewedAt() {
        return reviewedAt;
    }

    public List<PostImage> getImages() {
        return images;
    }
}
