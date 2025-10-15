import {computed, effect, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {ProductApi} from '../../core/product-api';
import {LocalStorageService} from '../../core/local-storage.service';
import {ProductModel} from '../../features/product/models/product-model';
import {CartItem} from '../../features/cart/models/cart-item';

@Injectable({providedIn: 'root'})
export class Store {
  $products: WritableSignal<ProductModel[]> = signal<ProductModel[]>([])
  $itemsInCart: WritableSignal<CartItem[]> = signal<CartItem[]>([])
  readonly $cartCount: Signal<number> = computed(() =>
    this.$itemsInCart().reduce((sum, i) => sum + i.quantity, 0)
  );
  $categoryFilter: WritableSignal<string> = signal<string>("");
  $filteredProducts: Signal<ProductModel[]> = computed(() => {
    const category: string = this.$categoryFilter();
    if (!category) return this.$products();
    return this.$products().filter((p: ProductModel): boolean => p.category === category);
  })
  private _productApi: ProductApi = inject(ProductApi);
  private _localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    const savedItems: CartItem[] = this._localStorageService.load()
    this.$itemsInCart.set(savedItems);
    this.loadProducts()
    this.persistInStorage()


  }

  popFromCart(cartItem: CartItem): void {
    this.$itemsInCart.update((items: CartItem[]) => {
      const cart: CartItem[] = [...items];
      const idx: number = cart.findIndex((i: CartItem) => i.product.id === cartItem.product.id);
      if (idx > -1) {
        const existing: CartItem = cart[idx];
        if (existing.quantity > cartItem.quantity) {
          cart[idx] = {...existing, quantity: existing.quantity - cartItem.quantity};
        } else {
          cart.splice(idx, 1);
        }
      }
      return cart;
    });
  }

  addToCart(cartItem: CartItem): void {
    this.$itemsInCart.update(items => {
      const cart: CartItem[] = [...items];
      const idx: number = cart.findIndex((i: CartItem) => i.product.id === cartItem.product.id);
      if (idx > -1) {
        const existing: CartItem = cart[idx];
        cart[idx] = {...existing, quantity: existing.quantity + cartItem.quantity};
      } else {
        cart.push(cartItem);
      }
      return cart;
    });
  }

  decreaseProductQuantity(cartItem: CartItem): void {
    this.$products.update((products: ProductModel[]) =>
      products.map((productModel: ProductModel) =>
        productModel.id === cartItem.product.id
          ? {...productModel, quantity: Math.max(productModel.quantity - cartItem.quantity, 0)}
          : productModel
      )
    );

  }

  increaseProductQuantity(cartItem: CartItem): void {
    this.$products.update((products: ProductModel[]) =>
      products.map((productModel: ProductModel) =>
        productModel.id === cartItem.product.id
          ? {...productModel, quantity: Math.max(productModel.quantity + cartItem.quantity, 0)}
          : productModel
      )
    );

  }

  setFilter(category: string): void {
    this.$categoryFilter.set(category);
  }

  removeFromCart(productId: number): void {
    const removedItem: CartItem | undefined = this.$itemsInCart().find(i => i.product.id === productId);
    if (!removedItem) return;

    this.$itemsInCart.update((items: CartItem[]) =>
      items.filter(i => i.product.id !== productId)
    );


    this.$products.update((products: ProductModel[]) =>
      products.map((product: ProductModel) =>
        product.id === productId
          ? {...product, quantity: product.quantity + removedItem.quantity}
          : product
      )
    );

  }

  private loadProducts(): void {
    this._productApi.load().then(products => {
      this.updateProductsFromLocalStorage(products)


    })
  }

  private persistInStorage(): void {
    effect(() => this._localStorageService.save(this.$itemsInCart()));

  }

  private updateProductsFromLocalStorage(products: ProductModel[]): void {
    const cartItems: CartItem[] = this._localStorageService.load();

    const updatedProducts: ProductModel[] = products.map((product: ProductModel) => {
      const cartItem = cartItems.find((cardItem: CartItem) => cardItem.product.id === product.id);
      return cartItem
        ? {...product, quantity: product.quantity - cartItem.quantity}
        : product;
    });

    this.$products.set(updatedProducts);

  }


}
