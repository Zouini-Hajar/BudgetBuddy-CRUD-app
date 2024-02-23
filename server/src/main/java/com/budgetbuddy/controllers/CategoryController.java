package com.budgetbuddy.controllers;

import com.budgetbuddy.entities.Category;
import com.budgetbuddy.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins="*")
@Controller
@RequestMapping(path="/api/categories")
public class CategoryController {
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    record NewCategoryRequest(String name) {}

    @PostMapping(path="/add")
    public @ResponseBody String addCategory(
            @RequestBody NewCategoryRequest request
    ) {
        Category n = new Category();
        n.setName(request.name());
        categoryRepository.save(n);

        return "Added Category";
    }

    @PutMapping("{categoryId}")
    public @ResponseBody String updateCategory(
            @RequestBody NewCategoryRequest request,
            @PathVariable("categoryId") Integer id
    ) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if(optionalCategory.isPresent()) {
            Category c = optionalCategory.get();
            c.setName(request.name());
            categoryRepository.save(c);
            return "Category updated";
        } else {
            return "Category not found";
        }
    }

    @DeleteMapping("{categoryId}")
    public @ResponseBody String deleteCategory(@PathVariable("categoryId") Integer id) {
        categoryRepository.deleteById(id);
        return "Category deleted";
    }
}
