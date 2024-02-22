package com.tests.system.tests.service;

import com.tests.system.tests.entities.Category;
import com.tests.system.tests.service.dto.CategoryDTO;

import java.util.List;
import java.util.Set;

public interface CategoryService {
    Category createCategory(CategoryDTO categoryDTO);
    Category findCategoryById(Long id);
    List<Category> findAllCategories();
    void deleteCategoryById(Long id);
    Category updateCategory(CategoryDTO categoryDTO, Long id);
}
