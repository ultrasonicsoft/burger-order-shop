import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ContactEntry } from 'src/app/@models/contact-entry.model';

@Component({
  selector: 'sam-contact-view',
  standalone: true,
  imports: [],
  templateUrl: './contact-view.component.html',
  styleUrls: ['./contact-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactViewComponent {

  @Input() contact!: ContactEntry;
}
