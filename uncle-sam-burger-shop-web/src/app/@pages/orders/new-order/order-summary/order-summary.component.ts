import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { OrderEntry } from 'src/app/@models/order-entry.model';
import { Store } from '@ngxs/store';
import { Subscription, tap } from 'rxjs';
import { NewOrderState } from 'src/app/@states/new-order.state';
import { EmitterService } from '@ngxs-labs/emitter';
import { AppConfig } from 'src/app/@config/config';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sam-order-summary',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    CurrencyPipe
  ],
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
