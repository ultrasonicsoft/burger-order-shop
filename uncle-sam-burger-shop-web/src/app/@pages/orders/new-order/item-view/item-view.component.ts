import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { Item } from 'src/app/@models/order-entry.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmitterService } from '@ngxs-labs/emitter';
import { NewOrderState } from 'src/app/@states/new-order.state';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'sam-item-view',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    NgFor,
    NgIf
  ],
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemViewComponent {

  @Input() items!: Item[];

  emitter = inject(EmitterService);

  removeItem(item: Item): void {
    this.emitter.action(NewOrderState.removeItem).emit(item as any);
  }
}
