
export class Training {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    quantity: number;

    constructor(id: string, name: string, category: string, description: string, price: number, quantity?: number) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.description = description;
        this.price = price;
        this.quantity = quantity ?? 1;
    }
};