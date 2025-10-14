import {Component, effect} from '@angular/core';
import {Cart} from "../cart/cart";
import {CartItem} from "../../models/cart-item";
import {CartSummary} from "../cart-summary/cart-summary";
import {Store} from '../../../../core/store';

@Component({
  selector: 'app-cart-page',

  imports: [
    Cart,
    CartSummary
  ],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.scss'
})
export class CartPage {

  cart: CartItem[] = [];

  constructor(private _store: Store) {
    effect(() => {
      this.cart = this._store.$itemsInCart();
    });
  }

  remove(productId: number) {
    this._store.removeFromCart(productId);
  }



}
