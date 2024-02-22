package com.tests.system.tests.controller;

import com.tests.system.tests.entities.Category;
import com.tests.system.tests.service.dto.CategoryDTO;
import com.tests.system.tests.service.impl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Set;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {
    @Autowired
    private CategoryServiceImpl categoryService;

    @PostMapping("/create")
    public ResponseEntity<Category> createCategory(@RequestBody CategoryDTO categoryDTO) throws URISyntaxException {
        return ResponseEntity.created(new URI("/category/create")).body(categoryService.createCategory(categoryDTO));
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Category> findById(@PathVariable("id") Long id){
        return ResponseEntity.ok().body(categoryService.findCategoryById(id));
    }
    @GetMapping("/findAll")
    public ResponseEntity<?> findAllCategories(){
        return ResponseEntity.ok().body( categoryService.findAllCategories());
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody CategoryDTO categoryDTO, @PathVariable("id") Long id){
        return ResponseEntity.ok().body(categoryService.updateCategory(categoryDTO,id));
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id){
        categoryService.deleteCategoryById(id);
        return ResponseEntity.ok().body("The element with id : "+id+" was eliminated correct");
    }
}
