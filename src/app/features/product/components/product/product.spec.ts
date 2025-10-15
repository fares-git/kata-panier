import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Product} from './product';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import {Store} from '../../../../shared/store/store';
import {ProductModel} from '../../models/product-model';
import {Category} from '../../../../shared/enums/category';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import '@angular/common/locales/global/fr';

describe('Product Component', () => {
  let fixture: ComponentFixture<Product>;
  let component: Product;
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
      decreaseProductQuantity: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [
        Product,
        ReactiveFormsModule,
        CurrencyPipe,
        MatCard,
        MatCardContent,
        MatInput,
        MatFormField,
        MatLabel,
        MatError,
        MatButton
      ],
      providers: [{ provide: Store, useValue: storeMock }, FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    (component.$product as any) = () => mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productForm with quantity', () => {
    expect(component.productForm.value.quantity).toBe(1);
  });

  it('should return correct isStillAvailable', () => {
    expect(component.isStillAvailable).toBe(true);
    (component.$product as any) = () => ({ ...mockProduct, quantity: 0 });
    expect(component.isStillAvailable).toBe(false);
  });

  it('should add product to store when addProduct is called', () => {
    component.addProduct();
    expect(storeMock.addToCart).toHaveBeenCalled();
    expect(storeMock.decreaseProductQuantity).toHaveBeenCalled();
  });
});
