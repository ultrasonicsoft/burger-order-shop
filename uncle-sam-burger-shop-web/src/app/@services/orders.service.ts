import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ENDPOINTS } from '../@config/endpoints';
import { OrderEntry } from '../@models/order-entry.model';
import { AppConfig } from '../@config/config';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  http = inject(HttpClient);

  getOrders(): Observable<OrderEntry[]> {
    return this.http.get<OrderEntry[]>(ENDPOINTS.ORDERS.orders());
  }

  getCount(): Observable<number> {
    return this.http.get<number>(ENDPOINTS.ORDERS.getCount()).pipe(map((response: any) => response.personCount))
  }

  loadNext(pageIndex: number, pageSize = AppConfig.PageSize): Observable<OrderEntry[]> {
    return this.http.get<OrderEntry[]>(ENDPOINTS.ORDERS.getOrders(pageIndex, pageSize));
  }

  placeOrder(order: OrderEntry): Observable<OrderEntry> {
    return this.http.post<OrderEntry>(ENDPOINTS.ORDERS.orders(), order);
  }
}
