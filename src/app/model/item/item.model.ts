export class Item {
    public name: string;
    public cost: number;
    public weight: number;

    constructor(name: string, cost: number = 0, weight: number = 0) {
        this.name = name;
        this.cost = cost;
        this.weight = weight;
    }
}