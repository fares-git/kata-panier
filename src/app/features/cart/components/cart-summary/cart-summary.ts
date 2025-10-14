import {CurrencyPipe} from '@angular/common';
import {Component, effect} from '@angular/core';
import {CartItem} from "../../models/cart-item";
import {TaxUtils} from "../../../../shared/utils/tax.util";
import {Store} from '../../../../core/store';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.html',
  styleUrls: ['./cart-summary.scss'],
  imports: [CurrencyPipe],

})
export class CartSummary {
  cart: CartItem[] = [];

  constructor(private _store: Store) {
    effect(() => {
      this.cart = this._store.$itemsInCart();
    });
  }

  getTotalTaxes(cart: CartItem[]): number {
    return TaxUtils.getTotalTaxes(cart);
  }

  getTotalTTC(cart: CartItem[]): number {
    return TaxUtils.getTotalTTC(cart);
  }
}
