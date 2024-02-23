import { Component } from '@angular/core';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CategoryModalComponent } from '../category-modal/category-modal.component';

@Component({
  selector: 'app-categories-list',
  standalone: true,
  imports: [
    ButtonModule, 
    CommonModule,
    CategoryModalComponent
  ],
  templateUrl: './categories-list.component.html',
  styleUrl: './categories-list.component.css'
})
export class CategoriesListComponent {
  categories: Category[] = [];
  selectedCategory?: Category;

  visible!: boolean;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
        .subscribe(categories => this.categories = categories);
  }

  showDialog(): void {
    this.visible = true;
  }

  modifyCategory(category: Category) {
    this.selectedCategory = category;
    this.showDialog();
  }
}
