import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/product-page/product-page').then((p) => p.ProductPage),
  }
];
