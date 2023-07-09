import { State, StateContext, createSelector } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { BurgerEntry } from '../@models/burger-entry.model';

@State<BurgerEntry[]>({
    name: 'burgers',
    defaults: []
})
export class BurgersState {

    static hasAny() {
        return createSelector([BurgersState], (state: BurgerEntry[]) => {
            return state.length > 0;
        });
    }

    @Receiver()
    static setAll(
        { setState }: StateContext<BurgerEntry[]>,
        { payload }: EmitterAction<BurgerEntry[]>) {
        setState(payload);
    }
}