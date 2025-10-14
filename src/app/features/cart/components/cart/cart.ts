import {ChangeDetectionStrategy, Component, inject, input, InputSignal, output, OutputEmitterRef} from '@angular/core';
import {ProductModel} from "../../../product/models/product-model";
import {CurrencyPipe} from "@angular/common";
import {TaxUtils} from "../../../../shared/utils/tax.util";
import {ReactiveFormsModule} from '@angular/forms';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon'
import {Store} from '../../../../core/store';
import {CartItem} from '../../models/cart-item';

@Component({
  selector: 'app-cart',

  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    MatIcon,
    MatCardContent,
    MatCard,
    MatIconButton,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Cart {
  $productAvailableQuantity: InputSignal<number> = input<number>(1);
  $productInCart: InputSignal<ProductModel | undefined> = input<ProductModel>();

  private _store:Store=inject(Store)

  removeFromCart: OutputEmitterRef<number> = output<number>();

  protected readonly calculateTTC = TaxUtils.calculateTTC;
  protected readonly calculateBaseTax = TaxUtils.calculateBaseTax;

  remove(id: number | undefined) {
    if (id !== undefined) {
      this.removeFromCart.emit(id);
    }
  }


  removeOneFromCart(): void {
    if(this.$productAvailableQuantity()<=1) {
      return;
    }
    let cartItem: CartItem = new CartItem(this.$productInCart()!,1);
    this._store.popFromCart(cartItem)
    this._store.increaseProductQuantity(cartItem)

  }
  get isStillAvailable(): boolean {
   return ( this.$productInCart()!.quantity - this.$productAvailableQuantity() )>0
  }


  addOneToCart() {
    if (!this.isStillAvailable) {
      return;
    }
    let cartItem = new CartItem(this.$productInCart()!,1);
    this._store.addToCart(cartItem)
    this._store.decreaseProductQuantity(cartItem)


  }
}
