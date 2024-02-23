import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { TransactionService } from '../../services/transaction.service';
import { Transaction } from '../../models/transaction';

@Component({
  selector: 'app-transaction-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    RadioButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    CalendarModule,
    ButtonModule
  ],
  templateUrl: './transaction-modal.component.html',
  styleUrl: './transaction-modal.component.css'
})
export class TransactionModalComponent {
  @Input() transaction?: Transaction;
  @Output() transactionChange = new EventEmitter<Transaction>();
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  type!: string;
  description!: string;
  amount!: number;
  category!: Category | undefined;
  date!: Date;

  categories: Category[] = [];

  constructor(
    private transactionService: TransactionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transaction'] && changes['transaction'].currentValue) {
      this.populateFields(changes['transaction'].currentValue);
    } else {
      this.populateFields({});
    }
  }

  populateFields(transaction: any): void {
    this.type = transaction?.type;
    this.description = transaction?.description;
    this.amount = transaction?.amount;
    this.category = transaction?.category;
    this.date = transaction?.date ? new Date(transaction.date) : new Date();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => this.categories = categories);
  }

  save(): void {
    const newTransaction: Transaction = {
      type: this.type,
      description: this.description,
      amount: this.amount,
      categoryId: this.category?.id || 0,
      date: this.formatDate(this.date!)
    };

    if (this.transaction) {
      // To add the transaction
      newTransaction.id = this.transaction.id;
      this.transactionService.updateTransaction(newTransaction)
        .subscribe((err) => console.log(err));
    } else {
      // To modify the transaction
      this.transactionService.addTransaction(newTransaction)
        .subscribe((err) => console.log(err));
    }

    this.reloadPage();
    this.hideModal();
  }

  hideModal() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.transaction = undefined;
    this.transactionChange.emit(this.transaction);
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  reloadPage() {
    window.location.reload();
  }
}
