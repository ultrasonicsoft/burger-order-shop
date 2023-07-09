import { ChangeDetectionStrategy, Component, ViewChild, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindContactComponent } from 'src/app/@components/find-contact/find-contact.component';
import { ContactViewComponent } from 'src/app/@pages/contacts/contact-view/contact-view.component';
import { ContactEntry } from 'src/app/@models/contact-entry.model';
import { MatDialog } from '@angular/material/dialog';
import { AddContactComponent } from 'src/app/@pages/contacts/add-contact/add-contact.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sam-order-contact',
  standalone: true,
  imports: [
    FindContactComponent,
    ContactViewComponent,
    MatIconModule,
    MatButtonModule,
    TranslateModule,
  ],
  templateUrl: './order-contact.component.html',
  styleUrls: ['./order-contact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderContactComponent {
  @Input() contact!: ContactEntry;;
  @Output() selected = new EventEmitter<ContactEntry>();
  @ViewChild('findContact', { static: false }) findContact!: FindContactComponent;

  dialog = inject(MatDialog);

  addContact(): void {
    const dialogRef = this.dialog.open(AddContactComponent, {
      width: '400px'
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
}
