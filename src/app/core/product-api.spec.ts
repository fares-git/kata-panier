import {TestBed} from '@angular/core/testing';
import {ProductApi} from './product-api';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from '@angular/common/http/testing';
import {ProductModel} from '../features/product/models/product-model';
import {environment} from '../../environments/environment';
import {Category} from '../shared/enums/category';

describe('ProductApi', () => {
  let service: ProductApi;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductApi],
    });

    service = TestBed.inject(ProductApi);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load products from API', async () => {
    const mockProducts: ProductModel[] = [
      { id: 1, productName: 'Book', price: 10, quantity: 5, isImported: false, category: Category.Books, isEssentialGoods: false },
      { id: 2, productName: 'Food', price: 20, quantity: 3, isImported: false, category: Category.Food, isEssentialGoods: true },
    ];

    const promise: Promise<ProductModel[]> = service.load();

    const req: TestRequest = httpMock.expectOne(environment.apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    const result: ProductModel[] = await promise;
    expect(result).toEqual(mockProducts);
  });
});
