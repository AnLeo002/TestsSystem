package com.tests.system.tests.service.impl;

import com.tests.system.tests.entities.Category;
import com.tests.system.tests.repository.CategoryRepo;
import com.tests.system.tests.service.CategoryService;
import com.tests.system.tests.service.dto.CategoryDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepo repo;
    @Override
    public Category createCategory(CategoryDTO categoryDTO) {
        Category category = Category.builder()
                .title(categoryDTO.getTitle())
                .description(categoryDTO.getDescription())
                .exams(categoryDTO.getExams())
                .build();
        return repo.save(category);
    }

    @Override
    public Category findCategoryById(Long id) {
        return repo.findById(id).orElseThrow();
    }

    @Override
    public List<Category> findAllCategories() {
        return repo.findAll();
    }

    @Override
    public void deleteCategoryById(Long id) {
        repo.deleteById(id);
    }

    @Override
    public Category updateCategory(CategoryDTO categoryDTO, Long id) {
        Category category = repo.findById(id).orElseThrow();

        category.setTitle(categoryDTO.getTitle());
        category.setDescription(categoryDTO.getDescription());
        category.setExams(categoryDTO.getExams());

        return repo.save(category);
    }
}
