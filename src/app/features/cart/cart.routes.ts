import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/cart-page/cart-page').then((c) => c.CartPage),
  },
];
