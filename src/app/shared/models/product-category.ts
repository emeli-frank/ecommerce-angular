export interface ProductCategoryJSONData {
    id?: number;
    name: string;
}

export class ProductCategory {
    constructor(private id: number, private name: string) {}

    static fromJSON(json: ProductCategoryJSONData): ProductCategory {
        return new ProductCategory(json.id, json.name);
    }
}
