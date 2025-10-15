import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Cart} from './cart';
import {ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {signal} from '@angular/core';
import {ProductModel} from '../../../product/models/product-model';
import {Category} from '../../../../shared/enums/category';
import { CartItem } from '../../models/cart-item';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';
import {MatIconButton} from '@angular/material/button';
import {Store} from '../../../../shared/store/store';

describe('Cart Component', () => {
  let component: Cart;
  let fixture: ComponentFixture<Cart>;
  let storeMock: Partial<Store>;

  const mockProduct: ProductModel = {
    id: 1,
    productName: 'Book',
    price: 10,
    quantity: 5,
    isImported: false,
    category: Category.Books,
    isEssentialGoods: false,
  };

  beforeEach(() => {
    storeMock = {
      addToCart: jest.fn(),
      popFromCart: jest.fn(),
      decreaseProductQuantity: jest.fn(),
      increaseProductQuantity: jest.fn(),
      $itemsInCart: signal<CartItem[]>([]),
      $products: signal<ProductModel[]>([]),
    };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CurrencyPipe, MatCard, MatCardContent, MatIcon, MatIconButton],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Cart);
    component = fixture.componentInstance;

    (component.$productAvailableQuantity as any) = () => 3;
    (component.$productInCart as any) = () => mockProduct;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit removeFromCart when remove is called with id', () => {
    const spy = jest.spyOn(component.removeFromCart, 'emit');
    component.remove(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should not emit removeFromCart when remove is called with undefined', () => {
    const spy = jest.spyOn(component.removeFromCart, 'emit');
    component.remove(undefined);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should remove one from cart when quantity > 1', () => {
    (component.$productAvailableQuantity as any) = () => 2;
    component.removeOneFromCart();
    expect(storeMock.popFromCart).toHaveBeenCalled();
    expect(storeMock.increaseProductQuantity).toHaveBeenCalled();
  });

  it('should not remove one from cart when quantity <= 1', () => {
    (component.$productAvailableQuantity as any) = () => 1;
    component.removeOneFromCart();
    expect(storeMock.popFromCart).not.toHaveBeenCalled();
    expect(storeMock.increaseProductQuantity).not.toHaveBeenCalled();
  });

  it('should return correct isStillAvailable', () => {
    (component.$productAvailableQuantity as any) = () => 2;
    expect(component.isStillAvailable).toBe(true);
    (component.$productAvailableQuantity as any) = () => 5;
    expect(component.isStillAvailable).toBe(false);
  });

  it('should add one to cart when available', () => {
    (component.$productAvailableQuantity as any) = () => 2;
    component.addOneToCart();
    expect(storeMock.addToCart).toHaveBeenCalled();
    expect(storeMock.decreaseProductQuantity).toHaveBeenCalled();
  });

  it('should not add one to cart when not available', () => {
    (component.$productAvailableQuantity as any) = () => 5;
    component.addOneToCart();
    expect(storeMock.addToCart).not.toHaveBeenCalled();
    expect(storeMock.decreaseProductQuantity).not.toHaveBeenCalled();
  });
});
