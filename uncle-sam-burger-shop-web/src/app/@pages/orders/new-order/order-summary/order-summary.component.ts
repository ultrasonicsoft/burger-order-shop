import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item, OrderEntry } from 'src/app/@models/order-entry.model';
import { Store } from '@ngxs/store';
import { Subscription, tap } from 'rxjs';
import { NewOrderComponent } from '../new-order.component';
import { NewOrderState } from 'src/app/@states/new-order.state';
import { EmitterService } from '@ngxs-labs/emitter';
import { AppConfig } from 'src/app/@config/config';

@Component({
  selector: 'sam-order-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderSummaryComponent implements OnDestroy {


  orderValue = 0;
  totalValue = 0;
  taxValue = AppConfig.TaxValue;


  store = inject(Store);
  emitter = inject(EmitterService);
  cd = inject(ChangeDetectorRef);
  subscription = new Subscription();

  ngOnInit() {
    this.subscription.add(this.store.select(NewOrderState).pipe(
      tap((order: OrderEntry) => {
        this.orderValue = order?.orderValue || 0;
        this.cd.detectChanges();
      })
    ).subscribe());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
