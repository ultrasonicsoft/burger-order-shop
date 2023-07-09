import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgFor } from '@angular/common';
import { Select, Store } from '@ngxs/store';
import { BurgersState } from 'src/app/@states/burgers.state';
import { Observable, Subscription } from 'rxjs';
import { BurgerEntry } from 'src/app/@models/burger-entry.model';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Item } from 'src/app/@models/order-entry.model';

@Component({
  selector: 'sam-item-entry',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    NgFor,
    AsyncPipe,
    MatIconModule,
    TranslateModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './item-entry.component.html',
  styleUrls: ['./item-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemEntryComponent implements OnInit, OnDestroy {

  burgers: BurgerEntry[] = [];
  quantity = 1;

  myControl = new FormControl();
  filteredOptions!: Observable<BurgerEntry[]>;

  selectedBurger!: BurgerEntry;

  store = inject(Store)
  subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<ItemEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BurgerEntry,
  ) {
    this.burgers = this.store.selectSnapshot(BurgersState);

  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): BurgerEntry[] {
    const filterValue = value.toLowerCase();
    return this.burgers.filter((burger: BurgerEntry) => burger.name.toLowerCase().includes(filterValue));
  }

  burgerSelected(selected: BurgerEntry): void {
    this.selectedBurger = selected;
  }

  addItem(): void {
    const item: Item = {
      itemId: '1',
      productId: this.selectedBurger.id.toString(),
      itemPrice: this.selectedBurger.price,
      quantity: this.quantity,
      name: this.selectedBurger.name
    };

    this.dialogRef.close(item);
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
