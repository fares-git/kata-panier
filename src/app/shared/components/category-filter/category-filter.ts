import {Component, inject, output, OutputEmitterRef} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {Category} from "../../enums/category";
import {MatDivider} from '@angular/material/divider';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';
import {Store} from '../../store/store';

@Component({
  selector: 'app-category-filter',
  templateUrl: './category-filter.html',
  styleUrls: ['./category-filter.scss'],
  imports: [
    FormsModule,
    MatDivider,
    MatRadioGroup,
    MatRadioButton
  ]
})
export class CategoryFilter {
  categorySelected: OutputEmitterRef<string> = output<string>();
  categories: Category[] = Object.values(Category);
  private _store: Store = inject(Store);

  get selectedCategory(): string {
    return this._store.$categoryFilter();
  }

  onCategorySelect(category: string): void {
    this.categorySelected.emit(category);
  }
}
