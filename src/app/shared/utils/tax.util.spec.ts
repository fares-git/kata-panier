import {Category} from '../enums/category';
import {ProductModel} from '../../features/product/models/product-model';
import {CartItem} from '../../features/cart/models/cart-item';
import {TaxUtils} from './tax.util';

describe('TaxUtils', () => {

  describe('roundUpToFiveCents', () => {
    it('rounds value up to nearest 0.05', () => {
      expect(TaxUtils.roundUpToFiveCents(1.01)).toBe(1.05);
      expect(TaxUtils.roundUpToFiveCents(1.04)).toBe(1.05);
      expect(TaxUtils.roundUpToFiveCents(1.05)).toBe(1.05);
      expect(TaxUtils.roundUpToFiveCents(1.06)).toBe(1.10);
    });
  });

  describe('addTax', () => {
    it('applies tax correctly and rounds it', () => {
      const result = TaxUtils.addTax(10, 100);
      expect(result).toBeCloseTo(110);
    });
  });

  describe('getBaseTaxPercentage', () => {
    it('returns correct tax percentage by category', () => {
      expect(TaxUtils['getBaseTaxPercentage'](Category.Books)).toBe(10);
      expect(TaxUtils['getBaseTaxPercentage'](Category.Food)).toBe(0);
      expect(TaxUtils['getBaseTaxPercentage'](Category.Medecine)).toBe(0);
      expect(TaxUtils['getBaseTaxPercentage'](Category.Electric)).toBe(20);
    });
  });

  describe('getUnitTax', () => {
    it('applies 10% for books (non essential)', () => {
      const product: ProductModel = {
        id: 1,
        productName: 'Book',
        price: 100,
        category: Category.Books,
        isImported: false,
        isEssentialGoods: false,
        quantity: 10
      };
      expect(TaxUtils.getUnitTax(product)).toBeCloseTo(10);
    });

    it('applies 20% for default category', () => {
      const product: ProductModel = {
        id: 2,
        productName: 'Phone',
        price: 100,
        category: Category.Electric,
        isImported: false,
        isEssentialGoods: false,
        quantity: 10
      };
      expect(TaxUtils.getUnitTax(product)).toBeCloseTo(20);
    });

    it('adds 5% extra for imported products', () => {
      const product: ProductModel = {
        id: 3,
        productName: 'Imported Phone',
        price: 100,
        category: Category.Electric,
        isImported: true,
        isEssentialGoods: false,
        quantity: 10
      };
      expect(TaxUtils.getUnitTax(product)).toBeGreaterThan(20);
    });

    it('skips base tax for essential goods', () => {
      const product: ProductModel = {
        id: 4,
        productName: 'Medicine',
        price: 100,
        category: Category.Medecine,
        isImported: false,
        isEssentialGoods: true,
        quantity: 10
      };
      expect(TaxUtils.getUnitTax(product)).toBe(0);
    });
  });

  describe('calculateTTC', () => {
    it('returns price including tax', () => {
      const product: ProductModel = {
        id: 5,
        productName: 'Book',
        price: 100,
        category: Category.Books,
        isImported: false,
        isEssentialGoods: false,
        quantity: 10
      };
      expect(TaxUtils.calculateTTC(product)).toBeCloseTo(110);
    });
  });

  describe('calculateItemTax', () => {
    it('multiplies TTC by quantity', () => {
      const product: ProductModel = {
        id: 6,
        productName: 'Book',
        price: 100,
        category: Category.Books,
        isImported: false,
        isEssentialGoods: false,
        quantity: 10
      };
      const item: CartItem = {product, quantity: 2};
      expect(TaxUtils.calculateItemTax(item)).toBeCloseTo(220);
    });
  });

  describe('calculateBaseTax', () => {
    it('returns total tax multiplied by quantity', () => {
      const product: ProductModel = {
        id: 7,
        productName: 'Book',
        price: 100,
        category: Category.Books,
        isImported: false,
        isEssentialGoods: false,
        quantity: 10
      };
      const item: CartItem = {product, quantity: 3};
      expect(TaxUtils.calculateBaseTax(item)).toBeCloseTo(30);
    });
  });

  describe('getTotalItemTax', () => {
    it('calculates unit tax * quantity', () => {
      const product: ProductModel = {
        id: 8,
        productName: 'Book',
        price: 100,
        category: Category.Books,
        isImported: false,
        isEssentialGoods: false,
        quantity: 10
      };
      const item: CartItem = {product, quantity: 4};
      expect(TaxUtils.getTotalItemTax(item)).toBeCloseTo(40);
    });
  });

  describe('getTotalTaxes', () => {
    it('sums all item taxes in the cart', () => {
      const cart: CartItem[] = [
        {
          product: {
            id: 9,
            productName: 'Book',
            price: 100,
            category: Category.Books,
            isImported: false,
            isEssentialGoods: false,
            quantity: 10
          }, quantity: 1
        },
        {
          product: {
            id: 10,
            productName: 'Laptop',
            price: 200,
            category: Category.Electric,
            isImported: false,
            isEssentialGoods: false,
            quantity: 10
          }, quantity: 1
        }
      ];
      expect(TaxUtils.getTotalTaxes(cart)).toBeCloseTo(10 + 40);
    });
  });

  describe('getTotalTTC', () => {
    it('sums all TTC values in the cart', () => {
      const cart: CartItem[] = [
        {
          product: {
            id: 11,
            productName: 'Book',
            price: 100,
            category: Category.Books,
            isImported: false,
            isEssentialGoods: false,
            quantity: 10
          }, quantity: 1
        },
        {
          product: {
            id: 12,
            productName: 'Laptop',
            price: 200,
            category: Category.Electric,
            isImported: false,
            isEssentialGoods: false,
            quantity: 10
          }, quantity: 1
        }
      ];
      expect(TaxUtils.getTotalTTC(cart)).toBeCloseTo(110 + 240);
    });
  });
});
