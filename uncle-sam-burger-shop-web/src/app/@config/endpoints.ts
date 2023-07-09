import { environment } from "src/environments/environment.development";

export const ENDPOINTS = {
    CONTACTS: {
        getCount: () => environment.contactsApiUrl + `/api/v1/person/count`,
        getContacts: (pageIndex: number, pageSize: number) => environment.contactsApiUrl + `/api/v1/person?page=${pageIndex}&size=${pageSize}`,
        contacts: () => environment.contactsApiUrl + `/api/v1/person`
    },
    ORDERS: {
        getCount: () => environment.ordersApiUrl + `/api/v1/order/count`,
        getOrders: (pageIndex: number, pageSize: number) => environment.ordersApiUrl + `/api/v1/order?page=${pageIndex}&size=${pageSize}`,
        orders: () => environment.ordersApiUrl + `/api/v1/order`
    }
}