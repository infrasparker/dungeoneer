import { Creature } from "../creature.model";
import { Stats } from "../stats.model";
import { Ability } from "../ability.model";
import { Armor } from "../../mechanics/armor.model";

export abstract class Adventurer extends Creature {
    public className: string;
    public classDescription: string;
    
    public exp: number;
    public nextExp: number;
    public level: number;

    constructor(
        name: string,
        str?: number, dex?: number, con?: number, int?: number, wis?: number, cha?: number,
        level: number = 1
    ) {
        super(name, str, dex, con, int, wis, cha);
        this.exp = 400;
        this.nextExp = 1000;
        this.level = level;
    }

    public addExp(exp: number): void {
        if (this.exp + exp >= this.nextExp) {
            this.exp = this.exp + exp - this.nextExp;
            this.level++;
            this.nextExp = this.level * 1000;
        } else
            this.exp += exp;
    }
}