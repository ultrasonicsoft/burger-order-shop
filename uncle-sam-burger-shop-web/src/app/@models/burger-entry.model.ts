export interface BurgerEntry {
    burgers: Burger[];
}

export interface Burger {
    id: number;
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
