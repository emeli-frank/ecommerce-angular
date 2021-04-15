import { Price } from "../interfaces/price";

export interface ProductJSONData {
    id?: number;
    name: string;
    category_id?: number;
    price: Price;
    rating: number,
    description: string;
    quantity: number;
}

export class Product {
    constructor(public id: number, public name: string, public price?: Price, public categoryId?: number, 
        public rating?: number, public description?: string, quantity?: number) {}

    static fromJSON(json: ProductJSONData): Product {
        return new Product(json.id, json.name, json.price, json.category_id, json.rating, json.description, json.quantity);
    }
}
