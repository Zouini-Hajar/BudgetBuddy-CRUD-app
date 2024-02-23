package com.budgetbuddy.controllers;

import com.budgetbuddy.entities.Category;
import com.budgetbuddy.repositories.CategoryRepository;
import com.budgetbuddy.entities.Transaction;
import com.budgetbuddy.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins="*")
@Controller
@RequestMapping(path="/api/transactions")
public class TransactionController {
    @Autowired
    private TransactionRepository transactionRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping(path="/all")
    public @ResponseBody Iterable<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    record NewTransactionRequest(
            String type,
            String description,
            Double amount,
            Integer categoryId,
            String date
    ) {}

    @PostMapping(path="/add")
    public @ResponseBody String addTransaction(
            @RequestBody NewTransactionRequest request
    ) {
        Transaction t = new Transaction();
        t.setType(request.type());
        t.setDescription(request.description());
        t.setAmount(request.amount());
        t.setDate(request.date());

        Optional<Category> optionalCategory = categoryRepository.findById(request.categoryId());
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            t.setCategory(category);
            transactionRepository.save(t);
            return "Transaction saved";
        } else {
            return "Category not found, couldn't save transaction";
        }
    }

    @PutMapping("{transactionId}")
    public @ResponseBody String updateTransaction(
            @RequestBody NewTransactionRequest request,
            @PathVariable("transactionId") Integer id
    ) {
        Optional<Transaction> optionalTransaction = transactionRepository.findById(id);
        if (optionalTransaction.isPresent()) {
            Transaction t = optionalTransaction.get();
            t.setType(request.type());
            t.setDescription(request.description());
            t.setAmount(request.amount());
            t.setDate(request.date());

            Optional<Category> optionalCategory = categoryRepository.findById(request.categoryId());
            if (optionalCategory.isPresent()) {
                Category category = optionalCategory.get();
                t.setCategory(category);
                transactionRepository.save(t);
                return "Transaction updated";
            } else {
                return "Category not found, couldn't update transaction";
            }
        } else {
            return "Transaction not found";
        }
    }

    @DeleteMapping("{transactionId}")
    public @ResponseBody String deleteTransaction(@PathVariable("transactionId") Integer id) {
        transactionRepository.deleteById(id);
        return "Transaction deleted";
    }
}
