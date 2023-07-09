import { Component, OnDestroy, inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmitterService } from '@ngxs-labs/emitter';
import { ContactsState } from 'src/app/@states/contacts.state';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription, tap } from 'rxjs';
import { OrdersService } from 'src/app/@services/orders.service';
import { OrderEntry } from 'src/app/@models/order-entry.model';
import { OrdersState } from 'src/app/@states/orders.state';

@Component({
  selector: 'sam-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
  ],

})
export class OrderListComponent implements OnDestroy {
  displayedColumns: string[] = ['id', 'orderDate', 'orderValue', 'firstName', 'lastName', 'houseNumber', 'streetAddress', 'zip', 'city'];
  dataSource!: MatTableDataSource<OrderEntry>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalOrders = 0;

  ordersService = inject(OrdersService);
  emitter = inject(EmitterService);

  subscription = new Subscription();

  constructor() {
    this.loadAllOrders();
    // NOTE: Order paginated API doesn't return value even in swagger

    // this.subscription.add(this.ordersService.getCount().pipe(
    //   tap((totalContacts: number) => {
    //     this.totalOrders = totalContacts;
    //     this.loadOrders(1, true);
    //   })
    // ).subscribe());
  }

  private loadAllOrders(): void {
    this.subscription.add(this.ordersService.getOrders().pipe(
      tap((orders: OrderEntry[]) => {
        console.debug('🔥 orders response', orders);
        this.emitter.action(OrdersState.setAll).emit(orders as any);
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    ).subscribe());
  }
  private loadOrders(pageIndex: number, firstLoad = false): void {
    this.subscription.add(this.ordersService.loadNext(pageIndex).pipe(
      tap((orders: OrderEntry[]) => {
        console.debug('🔥 orders response', orders);
        this.emitter.action(OrdersState.loadNext).emit(orders as any);
        this.dataSource = new MatTableDataSource(orders);
        if (firstLoad) {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }

      })
    ).subscribe());
  }

  loadNext(page: PageEvent): void {
    // this.loadOrders(page.pageIndex + 1);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}