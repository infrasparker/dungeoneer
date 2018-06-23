export class DiceRoll {
    public average: number;

    constructor(public amount: number, public faces: number) {
        let sum: number = 0;
        for (let n: number = 1; n <= this.faces; n++) {
            sum += n;
        }
        this.average = (sum / this.faces) * amount;
    }

    public roll(): number {
        return DiceRoll.roll(this.amount, this.faces);
    }

    public static d20(): number {
        return DiceRoll.roll(1, 20);
    }

    public static stat(): number {
        return DiceRoll.roll(3, 6);
    }

    public static roll(amount: number, faces: number): number {
        let sum: number = 0;
        for (let c: number = 0; c < amount; c++) {
            sum += Math.ceil(Math.random() * faces);
        }
        return sum;
    }
}