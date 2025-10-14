import { Injectable } from '@angular/core';
import {CartItem} from '../features/cart/models/cart-item';

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
  private readonly STORAGE_KEY = 'kata:v1';

  load(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  save(items: CartItem[]) {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }
}
