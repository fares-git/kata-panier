import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CartCounter } from './cart-counter';
import { signal, WritableSignal } from '@angular/core';
import {Store} from '../../../core/store';

describe('CartCounter Component', () => {
  let fixture: ComponentFixture<CartCounter>;
  let component: CartCounter;
  let storeMock: Partial<Store>;
  let cartCountSignal: WritableSignal<number>;

  beforeEach(() => {
    cartCountSignal = signal(5);
    storeMock = {
      $cartCount: cartCountSignal,
    };

    TestBed.configureTestingModule({
      imports: [CartCounter],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartCounter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compute countCartItems from store', () => {
    expect(component.countCartItems()).toBe(5);
    cartCountSignal.set(3);
    expect(component.countCartItems()).toBe(3);
  });
});
