import { Component } from '@angular/core';
import { Transaction } from '../../models/transaction';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent {
  transactions: Transaction[] = [];
  items: { title: string; icon: string; total: number; }[] = [];

  constructor(private transactionService: TransactionService) {
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => {
        this.transactions = transactions;
        this.initializeItems();
      });
  }

  initializeItems(): void {
    this.items = [
      {
        title: 'Total Income',
        icon: 'pi pi-arrow-up-right',
        total: this.calculateTotal('income')
      },
      {
        title: 'Total Expense',
        icon: 'pi pi-arrow-down-right',
        total: this.calculateTotal('expense')
      },
      {
        title: 'Net Income',
        icon: 'pi pi-wallet',
        total: this.calculateTotal('income') - this.calculateTotal('expense')
      }
    ];
  }

  calculateTotal(type: string): number {
    return this.transactions.filter(t => t.type == type).reduce((total, t) => total + t.amount, 0);
  }
}
