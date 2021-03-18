import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductResponseModel } from '../models/productResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = 'https://localhost:44385/api/products/getall';

  constructor(private httpClient: HttpClient) { }

  getProducts():Observable<ProductResponseModel> {
    return this.httpClient.get<ProductResponseModel>(this.apiUrl);
  }
}
