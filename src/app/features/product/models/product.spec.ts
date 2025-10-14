import { ProductModel } from './product-model';
import {Category} from '../../../shared/enums/category';

describe('ProductModel', () => {
  it('should create an instance', () => {
    const product: ProductModel = {
      id: 1,
      productName: 'Book',
      price: 10,
      quantity: 5,
      isImported: false,
      category: Category.Books,
      isEssentialGoods: false,
    };

    expect(product).toBeTruthy();
  });
});
