package com.heritage.platform.repository;

import com.heritage.platform.entity.Post;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    @EntityGraph(attributePaths = {"author", "category"})
    List<Post> findAllByOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = {"author", "category", "images"})
    Optional<Post> findById(Long id);
}
