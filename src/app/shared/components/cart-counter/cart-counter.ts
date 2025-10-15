import {Component, computed, inject, Signal} from '@angular/core';
import {Store} from '../../store/store';

@Component({
  selector: 'app-cart-counter',
  templateUrl: 'cart-counter.html',
  styleUrl: './cart-counter.scss',
  standalone: true
})
export class CartCounter {
  private _store: Store = inject(Store);
  countCartItems: Signal<number> = computed(() => this._store.$cartCount());
}
