import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { CommonModule } from '@angular/common';
import { TransactionModalComponent } from '../transaction-modal/transaction-modal.component';
import { ListboxModule } from 'primeng/listbox';
import { TooltipModule } from 'primeng/tooltip';
import { MultiSelectModule } from 'primeng/multiselect';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transactions-table',
  standalone: true,
  imports: [
    CommonModule,
    MultiSelectModule,
    FormsModule,
    TableModule,
    ButtonModule,
    ChipModule,
    TransactionModalComponent,
    ListboxModule,
    TooltipModule
  ],
  templateUrl: './transactions-table.component.html',
  styleUrl: './transactions-table.component.css'
})
export class TransactionsTableComponent {
  categories: Category[] = [];
  transactions: Transaction[] = [];
  selectedTransaction?: Transaction;
  types = ['income', 'expense'];

  visible!: boolean;

  constructor(
    private transactionService: TransactionService,
    private categortyService: CategoryService
  ) {}

  ngOnInit(): void {
    this.getTransactions();
    this.getCategories();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
        .subscribe(transactions => this.transactions = transactions);
  }

  getCategories(): void {
    this.categortyService.getCategories()
        .subscribe(categories => this.categories = categories);
  }

  modifyTransaction(transaction: Transaction) {
    this.selectedTransaction = transaction;
    this.showDialog();
  }

  deleteTransaction(id: number) {
    console.log(id)
    this.transactionService.deleteTransaction(id)
        .subscribe(err => console.log(err));
    
    //window.location.reload();
  }

  showDialog() {
    this.visible = true;
  }
}
