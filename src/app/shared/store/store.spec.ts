import { TestBed } from '@angular/core/testing';
import { Store } from './store';
import { ProductApi } from '../../core/services/product-api';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ProductModel } from '../../features/product/models/product-model';
import { CartItem } from '../../features/cart/models/cart-item';
import {Category} from '../enums/category';

describe('Store', () => {
  let store: Store;
  let mockApi: jest.Mocked<ProductApi>;
  let mockLocalStorage: jest.Mocked<LocalStorageService>;

  const mockProducts: ProductModel[] = [
    {
      id: 1,
      productName: 'Book',
      price: 10,
      quantity: 5,
      isImported: false,
      category: Category.Books,
      isEssentialGoods: false,
    },
    {
      id: 2,
      productName: 'Food',
      price: 20,
      quantity: 3,
      isImported: false,
      category: Category.Food,
      isEssentialGoods: true,
    },
  ];

  beforeEach(async () => {
    mockApi = {
      load: jest.fn().mockResolvedValue(mockProducts),
    } as any;

    mockLocalStorage = {
      load: jest.fn().mockReturnValue([]),
      save: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      providers: [
        Store,
        { provide: ProductApi, useValue: mockApi },
        { provide: LocalStorageService, useValue: mockLocalStorage },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should load products from ProductApi', async () => {
    await Promise.resolve(); // wait for async loadProducts()
    expect(mockApi.load).toHaveBeenCalled();
    expect(store.$products().length).toBe(2);
  });

  it('should add and remove items from cart', () => {
    const item: CartItem = { product: mockProducts[0], quantity: 2 };

    store.addToCart(item);
    expect(store.$itemsInCart().length).toBe(1);
    expect(store.$cartCount()).toBe(2);

    store.popFromCart({ product: mockProducts[0], quantity: 1 });
    expect(store.$itemsInCart()[0].quantity).toBe(1);

    store.popFromCart({ product: mockProducts[0], quantity: 1 });
    expect(store.$itemsInCart().length).toBe(0);
  });

  it('should decrease and increase product quantity correctly', () => {
    store.$products.set(mockProducts);

    const cartItem: CartItem = { product: mockProducts[0], quantity: 2 };
    store.decreaseProductQuantity(cartItem);

    expect(store.$products()[0].quantity).toBe(3);

    store.increaseProductQuantity(cartItem);
    expect(store.$products()[0].quantity).toBe(5);
  });

  it('should set category filter and compute filtered products', () => {
    store.$products.set(mockProducts);
    store.setFilter(Category.Food);

    const filtered = store.$filteredProducts();
    expect(filtered.length).toBe(1);
    expect(filtered[0].productName).toBe('Food');
  });

  it('should remove product from cart and restore quantity', () => {
    const item: CartItem = { product: mockProducts[0], quantity: 1 };
    store.$products.set(mockProducts);
    store.$itemsInCart.set([item]);

    store.removeFromCart(item.product.id);

    expect(store.$itemsInCart().length).toBe(0);
    expect(store.$products()[0].quantity).toBe(6);
  });
});
