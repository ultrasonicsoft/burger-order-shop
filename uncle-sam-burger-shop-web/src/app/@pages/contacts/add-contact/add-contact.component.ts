import { ChangeDetectionStrategy, Component, DestroyRef, Inject, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BurgerEntry } from 'src/app/@models/burger-entry.model';
import { BurgersState } from 'src/app/@states/burgers.state';
import { ItemEntryComponent } from '../../orders/new-order/item-entry/item-entry.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AppConfig } from 'src/app/@config/config';
import { ContactsService } from 'src/app/@services/contacts.service';
import { Subscription, tap } from 'rxjs';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'sam-add-contact',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddContactComponent implements OnDestroy {

  contactForm: FormGroup;

  contactService = inject(ContactsService);
  destroyRef = inject(DestroyRef);

  subscription = new Subscription()

  constructor(
    public dialogRef: MatDialogRef<ItemEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BurgerEntry,
    fb: FormBuilder
  ) {
    this.contactForm = fb.group({
      firstName: ['Thomas', Validators.required],
      lastName: ['Anderson', Validators.required],
      houseNumber: ['6', Validators.required],
      streetAddress: ['Goethestrasse', Validators.required],
      city: ['Muenchen', Validators.required],
      zip: ['80333', Validators.required],
      country: ['Germany']
    })
  }


  saveContact(): void {
    console.debug('🔥 contact', this.contactForm.value);
    if (this.contactForm.valid) {
      this.subscription.add(this.contactService.saveContact(this.contactForm.value).pipe(
      ).subscribe((response: ContactEntry) => {
        console.debug('🔥 saved contact', response);
        this.dialogRef.close(response);
      }));
    }

  }


  cancel(): void {
    this.dialogRef.close(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
