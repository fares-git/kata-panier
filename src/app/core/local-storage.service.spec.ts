import {TestBed} from '@angular/core/testing';
import {LocalStorageService} from './local-storage.service';
import {CartItem} from '../features/cart/models/cart-item';
import {ProductModel} from '../features/product/models/product-model';
import {Category} from '../shared/enums/category';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService],
    });
    service = TestBed.inject(LocalStorageService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load empty array when nothing in localStorage', () => {
    expect(service.load()).toEqual([]);
  });

  it('should save items to localStorage and load them', () => {
    const items: CartItem[] = [
      { product: { id: 1, productName: 'Book', price: 10, quantity: 5, isImported: false, category: Category.Books, isEssentialGoods: false } as ProductModel, quantity: 2 },
    ];

    service.save(items);
    const loaded: CartItem[] = service.load();
    expect(loaded).toEqual(items);
  });

  it('should return empty array on invalid JSON', () => {
    localStorage.setItem('kata:v1', '{invalidJson}');
    expect(service.load()).toEqual([]);
  });
});
