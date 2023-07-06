import { Selector, State, StateContext, createSelector } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { OrderEntry } from '../@models/order-entry.model';
import { AppConfig } from '../@config/config';

@State<OrderEntry[]>({
    name: 'orders',
    defaults: []
})
export class OrdersState {

    static hasAny() {
        return createSelector([OrdersState], (state: OrderEntry[]) => {
            return state.length > 0;
        });
    }

    @Receiver()
    static setAll(
        { setState }: StateContext<OrderEntry[]>,
        { payload }: EmitterAction<OrderEntry[]>) {
        setState(payload);
    }
}