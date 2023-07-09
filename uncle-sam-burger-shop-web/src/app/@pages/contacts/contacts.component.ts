import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactListComponent } from './contact-list/contact-list.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'sam-contacts',
  standalone: true,
  imports: [
    ContactListComponent,
    TranslateModule
  ],
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {

}
