import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../@config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  http = inject(HttpClient);

  getOrders(): Observable<any> {
    return this.http.get(ENDPOINTS.ORDERS.getOrders());
  }
}
