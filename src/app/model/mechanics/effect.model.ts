import { Creature } from "../creature/creature.model";

export abstract class Effect {
    protected value: number;
    public counter: number;

    constructor(value: number, counter: number = 1) {
        this.value = value;
        this.counter = counter;
    }

    public update(target: Creature): void {
        this.counter--;
        if (this.counter === 0)
            this.remove(target);
        else
            this.reApply(target);
    }

    public apply(target: Creature): void {
        target.effects.push(this);
    }
    
    public reApply(target: Creature): void { }

    public remove(target: Creature): void {
        target.effects.splice(target.effects.indexOf(this), 1);
    }
}

export class Effect_ACBonus extends Effect {
    constructor(value: number, counter: number = 1) {
        super(value, counter);
    }

    public apply(target: Creature): void {
        super.apply(target);
        target.acBonus += this.value;
    }

    public remove(target: Creature): void {
        super.remove(target);
        target.acBonus -= this.value;
    }
}

export class Effect_AttackBonus extends Effect {
    constructor(value: number, counter: number = 1) {
        super(value, counter);
    }

    public apply(target: Creature): void {
        super.apply(target);
        target.attackBonus += this.value;
    }

    public remove(target: Creature): void {
        super.remove(target);
        target.attackBonus -= this.value;
    }
}