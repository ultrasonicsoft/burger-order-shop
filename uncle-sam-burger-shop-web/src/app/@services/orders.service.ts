import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ENDPOINTS } from '../@config/endpoints';
import { OrderEntry } from '../@models/order-entry.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  http = inject(HttpClient);

  getOrders(): Observable<OrderEntry[]> {
    return this.http.get<OrderEntry[]>(ENDPOINTS.ORDERS.orders());
  }

  placeOrder(order: OrderEntry): Observable<OrderEntry> {
    return this.http.post<OrderEntry>(ENDPOINTS.ORDERS.orders(), order);
  }
}
