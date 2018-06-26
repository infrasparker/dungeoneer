import { Creature } from "./creature.model";
import { DiceRoll } from "../mechanics/roll.model";

export class Targets {
    public enemy:   boolean; // Can target enemies
    public ally:    boolean; // Can target allies
    public self:    boolean; // Can target self

    constructor(ally?: boolean, self?: boolean, enemy?: boolean) {
        this.ally = ally || false;
        this.self = self || false;
        this.enemy = enemy || true;
    }
}

export abstract class Ability {
    public name: string;
    public description: string;

    public targets: Targets;

    constructor(name: string, description?: string, ally?: boolean, self?: boolean, enemy?: boolean) {
        this.name = name;
        this.description = description || "STILL NEEDS DESCRIPTION"

        this.targets = new Targets(ally, self, enemy);
    }

    public abstract use(user: Creature, target: Creature): string;
}

export abstract class Buff extends Ability {
    constructor(name: string, description?: string, ally?: boolean, self?: boolean, enemy?: boolean) {
        super(name, description, ally, self, enemy);
    }
}

export abstract class AttackRoll extends Ability {
    constructor(name: string, description?: string, ally?: boolean, self?: boolean, enemy?: boolean) {
        super(name, description, ally, self, enemy);
    }

    /**
     * Applies an attack roll from one creature to another, creating flavor text.
     * @param user The creature initiating the attack roll.
     * @param target The creature receiving the attack roll.
     * @returns Flavor text summarizing the attack and its effects.
     */
    public use(user: Creature, target: Creature): string {
        let natural: number = DiceRoll.d20();
        let roll: number = natural + this.attackBonus(user, target);
        let text: string = this.attackFlavor(user, target, roll);

        if (roll < 8) {
            text += " The attack misses.";
        } else if (roll < user.dexAC()) {
            text += " " + target.name + " dodges the attack.";
        } else if (roll < user.blockAC()) {
            text += " " + target.name + " blocks the attack.";
        } else {
            text += " " + this.applyEffect(user, target);
        }
        return text;
    }

    protected abstract attackFlavor(user: Creature, target: Creature, roll: number): string;

    /**
     * Retrives additional bonus added on to natural attack roll. Examples include:
     * Strength, Dexterity, Proficiency Bonus, Buffs, Class abilities
     * @returns The bonus
     */
    protected abstract attackBonus(user: Creature, target: Creature): number;

    protected abstract applyEffect(user: Creature, target: Creature): string;
}