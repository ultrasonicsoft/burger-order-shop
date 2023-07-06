import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from 'src/app/@models/order-entry.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EmitterService } from '@ngxs-labs/emitter';
import { NewOrderState } from 'src/app/@states/new-order.state';

@Component({
  selector: 'sam-item-view',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './item-view.component.html',
  styleUrls: ['./item-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemViewComponent {

  @Input() item!: Item;

  emitter = inject(EmitterService);

  removeItem(): void {
    this.emitter.action(NewOrderState.removeItem).emit(this.item as any);
  }
}
