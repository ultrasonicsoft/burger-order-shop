import { State, StateContext, createSelector } from '@ngxs/store';
import { EmitterAction, Receiver } from '@ngxs-labs/emitter';
import { ContactEntry } from '../@models/contact-entry.model';

@State<ContactEntry[]>({
    name: 'contacts',
    defaults: []
})
export class ContactsState {

    static hasAny() {
        return createSelector([ContactsState], (state: ContactEntry[]) => {
            return state.length > 0;
        });
    }

    @Receiver()
    static add(
        { getState, setState }: StateContext<ContactEntry[]>,
        { payload }: EmitterAction<ContactEntry>) {
        const contacts = [...getState() || []];
        contacts.push(payload);
        setState(contacts);
    }

    @Receiver()
    static setAll(
        { setState }: StateContext<ContactEntry[]>,
        { payload }: EmitterAction<ContactEntry[]>) {
        setState(payload);
    }
}