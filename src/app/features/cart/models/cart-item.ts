import {ProductModel} from "../../product/models/product-model";

export class CartItem {
  product: ProductModel;
  quantity: number;

  constructor(product: ProductModel, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }
}
