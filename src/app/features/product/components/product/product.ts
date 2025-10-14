import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef
} from '@angular/core';
import {ProductModel} from "../../models/product-model";
import {CurrencyPipe, NgIf} from "@angular/common";
import {CartItem} from "../../../cart/models/cart-item";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {Store} from '../../../../core/store';
import {TaxUtils} from '../../../../shared/utils/tax.util';


@Component({
  selector: 'app-product',

  imports: [
    CurrencyPipe,
    ReactiveFormsModule,
    NgIf,
    MatCard,
    MatCardContent,
    MatInput,
    MatFormField,
    MatLabel,
    MatError,
    MatButton,
  ],
  templateUrl: './product.html',
  styleUrl: './product.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Product {
  $product: InputSignal<ProductModel> = input.required<ProductModel>();
  private _store: Store=inject(Store);

  selectedProduct: OutputEmitterRef<CartItem> = output<CartItem>()
  productForm!: FormGroup;

  constructor(private _fb: FormBuilder) {

    effect(() => {

      this.productForm = this._fb.group({
        quantity: [
          1,
          [
            Validators.required,
            Validators.min(1),
            Validators.max(this.$product().quantity),
          ],
        ],
      });

    });
  }

  get quantity() {
    return this.productForm.get('quantity')!;
  }

  get isStillAvailable(): boolean {
    return Number(this.$product()?.quantity) > 0;
  }

  addProduct(): void {
    let cartItem: CartItem = new CartItem(this.$product(), this.quantity.value);
    this._store.addToCart(cartItem)
    this._store.decreaseProductQuantity(cartItem)
  }

  protected readonly calculateTTC = TaxUtils.calculateTTC;
}
