import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { StatisticsComponent } from './components/statistics/statistics.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule, 
    RouterOutlet,
    StatisticsComponent,
    TransactionsTableComponent, 
    CategoriesListComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'BudgetBuddy';
}
