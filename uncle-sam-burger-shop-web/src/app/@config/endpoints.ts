import { environment } from "src/environments/environment.development";

export const ENDPOINTS = {
    CONTACTS: {
        contacts: () => environment.contactsApiUrl + `/api/v1/person`
    },
    ORDERS: {
        orders: () => environment.ordersApiUrl + `/api/v1/order`
    }
}