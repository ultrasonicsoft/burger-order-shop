import { environment } from "src/environments/environment.development";

export const ENDPOINTS = {
    CONTACTS: {
        contacts: () => `contacts/api/v1/person`
    },
    ORDERS: {
        orders: () => `orders/api/v1/order`
    }
}