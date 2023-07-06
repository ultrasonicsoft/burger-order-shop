import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, map, startWith } from 'rxjs';
import { Store } from '@ngxs/store';
import { BurgersState } from 'src/app/@states/burgers.state';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { AsyncPipe, NgFor, NgForOf } from '@angular/common';
import { ContactsState } from 'src/app/@states/contacts.state';

@Component({
  selector: 'sam-find-contact',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    TranslateModule,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './find-contact.component.html',
  styleUrls: ['./find-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindContactComponent {
  contacts: ContactEntry[] = [];
  filteredOptions!: Observable<ContactEntry[]>;

  selectedContact!: ContactEntry;

  store = inject(Store)

  myControl = new FormControl();

  constructor() {
    this.contacts = this.store.selectSnapshot(ContactsState);
  }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }

  private _filter(value: string): ContactEntry[] {
    const filterValue = value.toLowerCase();
    return this.contacts.filter((contact: ContactEntry) => contact.firstName.toLowerCase().includes(filterValue) ||
      contact.lastName.toLowerCase().includes(filterValue));
  }

  contactSelected(selected: ContactEntry): void {
    this.selectedContact = selected;
  }

  refresh(): void {
    this.contacts = this.store.selectSnapshot(ContactsState);

  }
}
