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
import { Item } from 'src/app/@models/order-entry.model';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { AsyncPipe, NgFor } from '@angular/common';
import { ItemViewComponent } from './item-view/item-view.component';
import { FindContactComponent } from 'src/app/@components/find-contact/find-contact.component';
import { AddContactComponent } from '../../contacts/add-contact/add-contact.component';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { ContactsState } from 'src/app/@states/contacts.state';

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
    FindContactComponent
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

  emitter = inject(EmitterService);
  dialog = inject(MatDialog);


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

  addContact(): void {
    const dialogRef = this.dialog.open(AddContactComponent, {
      // data: {name: this.name, animal: this.animal},
    });

    dialogRef.afterClosed().subscribe((contact: ContactEntry) => {
      console.log('The contact dialog was closed', contact);
      if (contact) {
        this.findContact.refresh();
        this.emitter.action(ContactsState.add).emit(contact as any);

      }
      // if (newItem) {
      //   this.emitter.action(NewOrderState.addItem).emit(newItem as any);
      // }
    });
  }


}
