import { environment } from "src/environments/environment.development";

export const ENDPOINTS = {
    CONTACTS: {
        getTotalContacts: () => environment.contactsApiUrl + `/api/v1/person/count`,
        getContacts: (pageIndex: number, pageSize: number) => environment.contactsApiUrl + `/api/v1/person?page=${pageIndex}&size=${pageSize}`,
        contacts: () => environment.contactsApiUrl + `/api/v1/person`
    },
    ORDERS: {
        orders: () => environment.ordersApiUrl + `/api/v1/order`
    }
}