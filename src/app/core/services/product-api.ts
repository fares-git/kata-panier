import {inject, Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProductModel} from '../../features/product/models/product-model';
import {firstValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductApi {
  private readonly _apiUrl: string = environment.apiUrl;

  private readonly _http: HttpClient = inject(HttpClient);

  async load(): Promise<ProductModel[]> {
    return await firstValueFrom(this._http.get<ProductModel[]>(this._apiUrl));

  }

}
