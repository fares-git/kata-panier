import {ComponentFixture, TestBed} from '@angular/core/testing';
import {CartPage} from './cart-page';
import {Store} from '../../../../shared/store/store';
import {CartItem} from '../../models/cart-item';
import {signal} from '@angular/core';
import {Category} from '../../../../shared/enums/category';

describe('CartPage Component', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  let storeMock: Partial<Store>;

  const mockCartItems: CartItem[] = [
    { product: { id: 1, productName: 'Book', price: 10, quantity: 5, isImported: false, category: Category.Books, isEssentialGoods: false }, quantity: 2 },
  ];

  beforeEach(() => {
    storeMock = {
      $itemsInCart: signal<CartItem[]>(mockCartItems),
      removeFromCart: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should call store.removeFromCart when remove is called', () => {
    component.remove(1);
    expect(storeMock.removeFromCart).toHaveBeenCalledWith(1);
  });
});
