import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', async () => {
    const response = await fetch('/data/products.json');
    const products = await response.json();

    return HttpResponse.json(products, { status: 200 });
  }),
];
