import { Address } from "./interfaces/address";
import { Product, ProductJSONData } from "./product";

export class Order {
    constructor(public id: number, item: Product, orderedAt: Date, address: Address) {}

    static fromJSON(data: OrderJSONData): Order {
        return new Order(data.id, Product.fromJSON(data.item), new Date(data.ordered_at), data.shipping_address);
    }
}

export interface OrderJSONData {
    id: number,
    item: ProductJSONData,
    ordered_at: string,
    shipping_address: Address,
}
