

export class Order {
    id: string;
    userId: string;
    trainings: [];
    totalPrice: number;
    orderDate: Date;

    constructor(id: string, userId: string, trainings: [], totalPrice: number, orderDate: Date) {
        this.id = id;
        this.userId = userId;
        this.trainings = trainings;
        this.totalPrice = totalPrice;
        this.orderDate = orderDate;
    }
};