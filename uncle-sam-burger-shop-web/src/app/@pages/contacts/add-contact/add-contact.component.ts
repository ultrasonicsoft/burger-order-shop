import { ChangeDetectionStrategy, Component, Inject, OnDestroy, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { BurgerEntry } from 'src/app/@models/burger-entry.model';
import { ItemEntryComponent } from '../../orders/new-order/item-entry/item-entry.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactsService } from 'src/app/@services/contacts.service';
import { Subscription, catchError, finalize, tap, throwError } from 'rxjs';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { EmitterService } from '@ngxs-labs/emitter';
import { ContactsState } from 'src/app/@states/contacts.state';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'sam-add-contact',
  standalone: true,
  imports: [
    NgIf,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatProgressBarModule
  ],
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddContactComponent implements OnDestroy {

  contactForm: FormGroup;

  emitter = inject(EmitterService);
  contactService = inject(ContactsService);
  snackBar = inject(MatSnackBar);

  working = false;

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

  showMessage(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000});
  }

  saveContact(): void {
    this.working = true;
    console.debug('🔥 contact', this.contactForm.value);
    if (this.contactForm.valid) {
      this.subscription.add(this.contactService.saveContact(this.contactForm.value).pipe(
        tap((savedContact: ContactEntry) => {
          console.debug('🔥 saved contact', savedContact);
          this.showMessage('Contact saved', 'Close');
          this.emitter.action(ContactsState.add).emit(savedContact as any);
          this.dialogRef.close(savedContact);
        }),
        catchError((err) => {
          return throwError(() => new Error('Could not save contact...please try again', err))
        }),
        finalize(() => {
          this.working = false;
        })
      ).subscribe());
    }

  }

  cancel(): void {
    this.dialogRef.close(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
