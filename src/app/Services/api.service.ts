import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postProduct(data: Product): Observable<Product> {

   return this.http.post<Product>("http://localhost:3000/products/",data);
  }

  getAllProducts(): Observable<Product[]>
   {
    return this.http.get<Product[]>("http://localhost:3000/products/");
  }

  putProduct(data: Product, id : number): Observable<Product> {
     return this.http.put<Product>("http://localhost:3000/products/"+id, data);
  }

  deleteProduct(id: number): any {


    return this.http.delete<Product>("http://localhost:3000/products/"+id);
  }

}
