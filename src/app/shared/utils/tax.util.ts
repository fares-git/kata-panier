import {ProductModel} from "../../features/product/models/product-model";
import {CartItem} from "../../features/cart/models/cart-item";
import {Category} from "../enums/category";
import {TaxRate} from '../enums/tax-rate';

export class TaxUtils {

  static roundUpToFiveCents(value: number): number {
    return Math.ceil(value * 20) / 20;
  }

  static addTax(percentage: number, price: number): number {
    const tax = (percentage / 100) * price;
    const roundedTax = TaxUtils.roundUpToFiveCents(tax);
    return price + roundedTax;
  }

  static getUnitTax(product: ProductModel): number {
    const price = product.price;
    let taxedPrice = price;

    const baseTax = TaxUtils.getBaseTaxPercentage(product.category);

    if (!product.isEssentialGoods) {
      taxedPrice = TaxUtils.addTax(baseTax, taxedPrice);
    }

    if (product.isImported) {
      taxedPrice = TaxUtils.addTax(TaxRate.IMPORTED * 100, taxedPrice);
    }

    return taxedPrice - price;
  }

  static calculateTTC(product: ProductModel): number {
    return product.price + TaxUtils.getUnitTax(product);
  }

  static calculateItemTax(item: CartItem): number {
    return TaxUtils.calculateTTC(item.product) * item.quantity;
  }

  static calculateBaseTax(item: CartItem): number {
    return (TaxUtils.calculateTTC(item.product) - item.product.price) * item.quantity;
  }

  static getTotalItemTax(item: CartItem): number {
    return TaxUtils.getUnitTax(item.product) * item.quantity;
  }

  static getTotalTaxes(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + TaxUtils.getTotalItemTax(item), 0);
  }

  static getTotalTTC(cart: CartItem[]): number {
    return cart.reduce((sum, item) => sum + TaxUtils.calculateItemTax(item), 0);
  }

  private static getBaseTaxPercentage(category: Category): number {
    const taxRates: Partial<Record<Category, number>> = {
      [Category.Books]: TaxRate.BOOKS,
      [Category.Food]: TaxRate.FOOD_AND_MEDICINE,
      [Category.Medecine]: TaxRate.FOOD_AND_MEDICINE,
    };
    return (taxRates[category] ?? TaxRate.DEFAULT) * 100;
  }
}
