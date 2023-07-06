import { ChangeDetectionStrategy, Component, ViewChild, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { ItemEntryComponent } from './item-entry/item-entry.component';
import { EmitterService } from '@ngxs-labs/emitter';
import { NewOrderState } from 'src/app/@states/new-order.state';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Item, OrderEntry, To } from 'src/app/@models/order-entry.model';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { ItemViewComponent } from './item-view/item-view.component';
import { FindContactComponent } from 'src/app/@components/find-contact/find-contact.component';
import { AddContactComponent } from '../../contacts/add-contact/add-contact.component';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { ContactsState } from 'src/app/@states/contacts.state';
import { ContactViewComponent } from '../../contacts/contact-view/contact-view.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { OrdersService } from 'src/app/@services/orders.service';

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
    FindContactComponent,
    ContactViewComponent,
    NgIf,
    OrderSummaryComponent
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

  @ViewChild('findContact', { static: false }) findContact!: FindContactComponent;

  soldToContact!: ContactEntry;
  shipToContact!: ContactEntry;
  billToContact!: ContactEntry;

  emitter = inject(EmitterService);
  store = inject(Store);
  dialog = inject(MatDialog);
  ordersService = inject(OrdersService);

  subscription = new Subscription();

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.emitter.action(NewOrderState.startOrder).emit();
  }

  addItem(): void {
    const dialogRef = this.dialog.open(ItemEntryComponent, {
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

  addContact(): void {
    const dialogRef = this.dialog.open(AddContactComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((contact: ContactEntry) => {
      console.log('The contact dialog was closed', contact);
      if (contact) {
        this.findContact.refresh();

      }
      // if (newItem) {
      //   this.emitter.action(NewOrderState.addItem).emit(newItem as any);
      // }
    });
  }

  confirmOrder(): void {
    const newOrder: OrderEntry = this.store.selectSnapshot(NewOrderState);
    if (newOrder) {
      this.subscription.add(
        this.ordersService.placeOrder(newOrder).subscribe((savedOrder: OrderEntry) => {
          console.debug('🔥 order created', savedOrder);
        }));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
