import {Component, computed, inject, Signal} from '@angular/core';
import {CategoryFilter} from "../../../../shared/components/category-filter/category-filter";
import {Product} from '../product/product';
import {Store} from '../../../../shared/store/store';
import {ProductModel} from '../../models/product-model';

@Component({
  selector: 'app-product-page',
  imports: [
    CategoryFilter,
    Product,
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss'
})
export class ProductPage {
  private _store: Store = inject(Store)

  products: Signal<ProductModel[]> = computed(() => this._store.$filteredProducts());


  onFilter(val: string): void {
    this._store.setFilter(val);
  }


}
