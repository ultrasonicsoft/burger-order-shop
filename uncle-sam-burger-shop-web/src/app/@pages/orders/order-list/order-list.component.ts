import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmitterService } from '@ngxs-labs/emitter';
import { TranslateModule } from '@ngx-translate/core';
import { Subscription, catchError, finalize, tap, throwError } from 'rxjs';
import { OrdersService } from 'src/app/@services/orders.service';
import { OrderEntry } from 'src/app/@models/order-entry.model';
import { OrdersState } from 'src/app/@states/orders.state';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sam-order-list',
  standalone: true,
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  imports: [
    NgIf,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    TranslateModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'orderDate', 'orderValue', 'firstName', 'lastName', 'houseNumber', 'streetAddress', 'zip', 'city'];
  dataSource!: MatTableDataSource<OrderEntry>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  totalOrders = 0;

  ordersService = inject(OrdersService);
  emitter = inject(EmitterService);

  subscription = new Subscription();

  working = false;

  cd = inject(ChangeDetectorRef);

  constructor() {
    // NOTE: Order paginated API doesn't return value even in swagger

    // this.subscription.add(this.ordersService.getCount().pipe(
    //   tap((totalContacts: number) => {
    //     this.totalOrders = totalContacts;
    //     this.loadOrders(1, true);
    //   })
    // ).subscribe());
  }

  ngOnInit() {
    this.loadAllOrders();
  }

  private loadAllOrders(): void {
    this.working = true;
    this.subscription.add(this.ordersService.getOrders().pipe(
      tap((orders: OrderEntry[]) => {
        console.debug('🔥 orders response', orders);
        this.emitter.action(OrdersState.setAll).emit(orders as any);
        this.dataSource = new MatTableDataSource(orders);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }),
      catchError((err) => {
        return throwError(() => new Error('Sorry, could not load orders... try again', err))
      }),
      finalize(() => {
        this.working = false;
        this.cd.detectChanges();
      })
    ).subscribe());
  }

  // private loadOrders(pageIndex: number, firstLoad = false): void {
  //   this.subscription.add(this.ordersService.loadNext(pageIndex).pipe(
  //     tap((orders: OrderEntry[]) => {
  //       console.debug('🔥 orders response', orders);
  //       this.emitter.action(OrdersState.loadNext).emit(orders as any);
  //       this.dataSource = new MatTableDataSource(orders);
  //       if (firstLoad) {
  //         this.dataSource.paginator = this.paginator;
  //         this.dataSource.sort = this.sort;
  //       }
  //     })
  //   ).subscribe());
  // }

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