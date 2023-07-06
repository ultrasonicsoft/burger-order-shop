import { Selector, State, StateContext } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { Item, OrderEntry, To } from '../@models/order-entry.model';
import { AppConfig } from '../@config/config';

@State<OrderEntry>({
    name: 'newOrder',
    defaults: {}
})
export class NewOrderState {

    @Selector()
    static items(state: OrderEntry): Item[] {
        return state?.items || [];
    }

    @Receiver()
    static startOrder(
        { setState }: StateContext<OrderEntry>) {

        const newOrder: OrderEntry = {
            id: AppConfig.getNewOrderId(),
            orderDate: new Date(),
            taxValue: AppConfig.TaxValue
        }
        setState(newOrder);
    }

    @Receiver()
    static addItem(
        { patchState, getState }: StateContext<OrderEntry>,
        { payload }: EmitterAction<Item>) {
        const newId: string = URL.createObjectURL(new Blob([])).slice(-AppConfig.OrderIdLength);

        const items: Item[] = [...getState().items || []];
        items.push(payload);
        const orderValue = NewOrderState.calculateOrderValue(items);
        patchState({
            items,
            orderValue
        });
    }

    static calculateOrderValue(items: Item[]): number {
        return items.reduce(
            (total: number, order: any) => total + order.itemPrice * order.quantity,
            0
        );
    }

    @Receiver()
    static removeItem(
        { patchState, getState }: StateContext<OrderEntry>,
        { payload }: EmitterAction<Item>) {
        const newId: string = URL.createObjectURL(new Blob([])).slice(-AppConfig.OrderIdLength);

        const items = [...getState().items || []];
        const index = items?.findIndex((x: Item) => x.itemId === payload.itemId);
        if (index >= 0) {
            items.splice(index, 1);
        }
        const orderValue = NewOrderState.calculateOrderValue(items);
        patchState({
            items,
            orderValue
        });
    }

    @Receiver()
    static updateOrderValue(
        { patchState }: StateContext<OrderEntry>,
        { payload }: EmitterAction<number>) {
        patchState({
            orderValue: payload
        })

    }



    @Receiver()
    static setSoldTo(
        { patchState }: StateContext<OrderEntry>,
        { payload }: EmitterAction<To>) {
        patchState({
            soldTo: payload
        });
    }

    @Receiver()
    static setShipTo(
        { patchState }: StateContext<OrderEntry>,
        { payload }: EmitterAction<To>) {
        patchState({
            shipTo: payload
        });
    }

    @Receiver()
    static setBillTo(
        { patchState }: StateContext<OrderEntry>,
        { payload }: EmitterAction<To>) {
        patchState({
            billTo: payload
        });
    }


}