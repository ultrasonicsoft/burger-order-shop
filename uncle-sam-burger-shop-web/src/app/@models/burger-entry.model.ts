export interface BurgerEntry {
    id: number;
    price: number;
    name: string;
    restaurant: string;
    web: string;
    description: string;
    ingredients: string[];
    addresses: Address[];
}

export interface Address {
    addressId?: number;
    number: string;
    line1: string;
    line2?: string;
    postcode: string;
    country: string;
    addressID?: number;
}
