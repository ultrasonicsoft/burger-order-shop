import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { EmitterService } from '@ngxs-labs/emitter';
import { NewOrderState } from 'src/app/@states/new-order.state';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Item, OrderEntry, To } from 'src/app/@models/order-entry.model';
import { Observable, Subscription, catchError, finalize, tap, throwError } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ItemViewComponent } from './item-view/item-view.component';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrdersService } from 'src/app/@services/orders.service';
import { OrderContactComponent } from './order-contact/order-contact.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'sam-new-order',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule,
    MatIconModule,
    MatDialogModule,
    NgFor,
    AsyncPipe,
    ItemViewComponent,
    OrderContactComponent,
    NgIf,
    OrderSummaryComponent,
    MatCardModule,
    MatSnackBarModule,
    MatProgressBarModule,
    RouterModule,

  ],
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewOrderComponent {
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  @Select(NewOrderState.items)
  items$!: Observable<Item[]>;


  soldToContact!: ContactEntry;
  shipToContact!: ContactEntry;
  billToContact!: ContactEntry;

  working = false;

  emitter = inject(EmitterService);
  store = inject(Store);
  dialog = inject(MatDialog);
  ordersService = inject(OrdersService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  cd = inject(ChangeDetectorRef);

  subscription = new Subscription();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.emitter.action(NewOrderState.startOrder).emit();
  }

  addItem(): void {
    const dialogRef = this.dialog.open(ItemEntryComponent, {
      width: '400px'
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((newItem: Item) => {
      console.log('The dialog was closed', newItem);
      if (newItem) {
        this.emitter.action(NewOrderState.addItem).emit(newItem as any);
      }
    });
  }

  soldToContactSelected(contact: ContactEntry): void {
    this.soldToContact = contact;
    const soldTo: To = { ...this.soldToContact };
    this.emitter.action(NewOrderState.setSoldTo).emit(soldTo as any);
  }

  shipToContactSelected(contact: ContactEntry): void {
    this.shipToContact = contact;
    const shipTo: To = { ...this.shipToContact };
    this.emitter.action(NewOrderState.setShipTo).emit(shipTo as any);
  }

  billToContactSelected(contact: ContactEntry): void {
    this.billToContact = contact;
    const billTo: To = { ...this.billToContact };
    this.emitter.action(NewOrderState.setBillTo).emit(billTo as any);
  }

  confirmOrder(): void {
    this.working = true;
    this.cd.detectChanges();
    const newOrder: OrderEntry = this.store.selectSnapshot(NewOrderState);
    if (newOrder) {
      this.subscription.add(
        this.ordersService.placeOrder(newOrder)
          .pipe(
            tap((savedOrder: OrderEntry) => {
              console.debug('🔥 order created', savedOrder);
              this.showMessage('Order Placed: ' + newOrder.id, 'Close');
              this.router.navigateByUrl('/orders');
            }),
            catchError((err) => {
              return throwError(() => new Error('Could not place order...please try again', err))
            }),
            finalize(() => {
              this.working = false;
            })
          ).subscribe());
    }
  }

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
