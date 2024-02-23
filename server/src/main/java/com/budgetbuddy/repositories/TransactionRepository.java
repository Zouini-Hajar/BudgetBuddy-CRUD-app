package com.budgetbuddy.repositories;

import com.budgetbuddy.entities.Transaction;
import org.springframework.data.repository.CrudRepository;

public interface TransactionRepository extends CrudRepository<Transaction, Integer> {
}
