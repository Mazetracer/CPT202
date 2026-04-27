package com.heritage.platform.service;

import com.heritage.platform.common.BadRequestException;
import com.heritage.platform.common.ResourceNotFoundException;
import com.heritage.platform.dto.request.CategoryCreateRequest;
import com.heritage.platform.dto.response.CategoryResponse;
import com.heritage.platform.entity.Category;
import com.heritage.platform.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Transactional
    public CategoryResponse create(CategoryCreateRequest request) {
        if (categoryRepository.existsByName(request.name())) {
            throw new BadRequestException("分类名称已存在");
        }

        Category category = categoryRepository.save(Category.create(request.name(), request.description()));
        return toResponse(category);
    }

    @Transactional(readOnly = true)
    public List<CategoryResponse> listAll() {
        return categoryRepository.findAll().stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public Category getById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("分类不存在"));
    }

    private CategoryResponse toResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getCreatedAt()
        );
    }
}
