package com.budgetbuddy.repositories;

import com.budgetbuddy.entities.Category;
import org.springframework.data.repository.CrudRepository;

public interface CategoryRepository extends CrudRepository<Category, Integer> {
}
