export interface OrderEntry {
    billTo?: To;
    currencyCode?: string;
    id?: string;
    items?: Item[];
    orderDate?: Date;
    orderValue?: number;
    shipTo?: To;
    soldTo?: To;
    taxValue?: number;
}

export interface To {
    city: string;
    country: string;
    firstName: string;
    houseNumber: string;
    lastName: string;
    streetAddress: string;
    zip: string;
}

export interface Item {
    itemId: string;
    itemPrice: number;
    productId: string;
    quantity: number;
    // Note: For FE
    name?: string;
}