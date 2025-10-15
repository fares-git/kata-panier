import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CartSummary} from './cart-summary';
import {CartItem} from '../../models/cart-item';
import {CurrencyPipe} from '@angular/common';
import {signal, WritableSignal} from '@angular/core';
import {Store} from '../../../../shared/store/store';
import {ProductModel} from '../../../product/models/product-model';
import {Category} from '../../../../shared/enums/category';
import {TaxUtils} from '../../../../shared/utils/tax.util';
import '@angular/common/locales/global/fr';

describe('CartSummary Component', () => {
  let fixture: ComponentFixture<CartSummary>;
  let component: CartSummary;
  let storeMock: Partial<Store>;
  let itemsSignal: WritableSignal<CartItem[]>;

  const mockProduct: ProductModel = {
    id: 1,
    productName: 'Book',
    price: 10,
    quantity: 5,
    isImported: false,
    category: Category.Books,
    isEssentialGoods: false,
  };

  const mockCart: CartItem[] = [{ product: mockProduct, quantity: 2 }];

  beforeEach(() => {
    itemsSignal = signal(mockCart);
    storeMock = { $itemsInCart: itemsSignal };

    TestBed.configureTestingModule({
      imports: [CartSummary, CurrencyPipe],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartSummary);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should compute total taxes correctly', () => {
    const spy = jest.spyOn(TaxUtils, 'getTotalTaxes').mockReturnValue(5);
    expect(component.getTotalTaxes(mockCart)).toBe(5);
    expect(spy).toHaveBeenCalledWith(mockCart);
  });

  it('should compute total TTC correctly', () => {
    const spy = jest.spyOn(TaxUtils, 'getTotalTTC').mockReturnValue(25);
    expect(component.getTotalTTC(mockCart)).toBe(25);
    expect(spy).toHaveBeenCalledWith(mockCart);
  });
});
