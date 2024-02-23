import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';


@Component({
  selector: 'app-category-modal',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    FormsModule,
    InputTextModule,
    ButtonModule
  ],
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css'
})
export class CategoryModalComponent {
  @Input() category?: Category;
  @Output() categoryChange = new EventEmitter<Category>();
  @Input() visible!: boolean;
  @Output() visibleChange = new EventEmitter<boolean>();

  name!: string;

  constructor(private categoryService: CategoryService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category'] && changes['category'].currentValue) {
      this.name = changes['category'].currentValue.name;
    } else {
      this.name = '';
    }
  }

  save() {
    this.categoryService.addCategory({name: this.name})
      .subscribe(err => console.log(err));
    this.reloadPage();
    this.hideModal();
  }

  modify() {
    this.categoryService.updateCategory({id: this.category?.id, name: this.name})
      .subscribe(err => console.log(err));
    this.reloadPage();
    this.hideModal();
  }

  delete() {
    this.categoryService.deleteCategory(this.category?.id || 0)
      .subscribe(err => console.log(err));
    this.reloadPage();
    this.hideModal();
  }

  hideModal() {
    this.category = undefined;
    this.categoryChange.emit(this.category);
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  reloadPage() {
    window.location.reload();
  }
}
