import {CartItem} from './cart-item';
import {ProductModel} from '../../product/models/product-model';
import {Category} from '../../../shared/enums/category';

describe('CartItem', () => {
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
    expect(new CartItem(product, 1)).toBeTruthy();
  });
});
