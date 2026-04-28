package com.heritage.platform.repository;

import com.heritage.platform.entity.Post;
import com.heritage.platform.enums.PostStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    Page<Post> findAllBy(Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByOrderByUpdatedAtDesc();

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByStatusOrderByCreatedAtDesc(PostStatus status);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    @Query("""
            select p
            from Post p
            join p.author a
            join p.category c
            where p.status = :status
              and (:categoryId is null or c.id = :categoryId)
              and (
                    :keyword is null
                    or lower(p.title) like lower(concat('%', :keyword, '%'))
                    or lower(coalesce(p.heritageName, '')) like lower(concat('%', :keyword, '%'))
                    or lower(coalesce(p.region, '')) like lower(concat('%', :keyword, '%'))
                    or lower(a.nickname) like lower(concat('%', :keyword, '%'))
                    or lower(c.name) like lower(concat('%', :keyword, '%'))
              )
            order by p.createdAt desc
            """)
    List<Post> searchPublishedPosts(
            @Param("status") PostStatus status,
            @Param("keyword") String keyword,
            @Param("categoryId") Long categoryId
    );

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByStatusOrderByUpdatedAtDesc(PostStatus status);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    Page<Post> findAllByStatus(PostStatus status, Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByStatusOrderBySubmittedAtDescUpdatedAtDesc(PostStatus status);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByTitleContainingIgnoreCaseOrderByUpdatedAtDesc(String title);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    Page<Post> findAllByTitleContainingIgnoreCase(String title, Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByStatusAndTitleContainingIgnoreCaseOrderByUpdatedAtDesc(PostStatus status, String title);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    Page<Post> findAllByStatusAndTitleContainingIgnoreCase(PostStatus status, String title, Pageable pageable);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByStatusAndTitleContainingIgnoreCaseOrderBySubmittedAtDescUpdatedAtDesc(PostStatus status, String title);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByAuthorIdOrderByUpdatedAtDesc(Long authorId);

    @EntityGraph(attributePaths = {"author", "category", "reviewedBy"})
    List<Post> findAllByAuthorIdAndStatusOrderByUpdatedAtDesc(Long authorId, PostStatus status);

    @EntityGraph(attributePaths = {"author", "category", "images", "reviewedBy"})
    Optional<Post> findById(Long id);

    @EntityGraph(attributePaths = {"author", "category", "images", "reviewedBy"})
    Optional<Post> findByIdAndStatus(Long id, PostStatus status);

    @EntityGraph(attributePaths = {"author", "category", "images", "reviewedBy"})
    Optional<Post> findByIdAndAuthorId(Long id, Long authorId);

    long countByAuthorIdAndStatus(Long authorId, PostStatus status);
}
