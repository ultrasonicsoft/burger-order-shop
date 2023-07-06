import { environment } from "src/environments/environment.development";

export const ENDPOINTS = {
    CONTACTS: {
        getContacts: () => `contacts/api/v1/person`
    },
    ORDERS: {
        getOrders: () => `orders/api/v1/order`
    }
}