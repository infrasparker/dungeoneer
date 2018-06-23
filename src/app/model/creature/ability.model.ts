import { Creature } from "./creature.model";
import { DiceRoll } from "../mechanics/roll.model";

export abstract class Ability {
    public name: string;
    public description: string;

    public targets: Targets;

    constructor(name: string, description?: string, ally?: boolean, self?: boolean, enemy?: boolean) {
        this.name = name;
        this.description = description || "STILL NEEDS DESCRIPTION"

        this.targets = new Targets(ally, self, enemy);
    }

    public abstract affect(user: Creature, target: Creature): string;

    public abstract display(): string;
}

export abstract class Buff extends Ability {
    constructor(name: string, description?: string, ally?: boolean, self?: boolean, enemy?: boolean) {
        super(name, description, ally, self, enemy);
    }

    public affect(user: Creature, target: Creature): string {
        let text: string = "";

        text += " " + this.applyBuff(user, target);

        return text;
    }

    // public abstract buffText(user: Creature, target: Creature): string;

    public abstract applyBuff(user: Creature, target: Creature): string;
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
    public affect(user: Creature, target: Creature): string {
        let text: string = "";

        let roll: number = DiceRoll.d20() + this.attackBonus(user);

        // Initiating attack
        text += this.initiateAttackText(roll);

        // Checking if attack hit
        let temp: [boolean, string] = target.defendFromAttackRoll(roll);
        text += " " + temp[1];

        // If attack does hit, apply ability effect - could be damage, saving throw, or both
        if (temp[0])
            text += " " + this.applyEffect(user, target);
        
        // Return accumulated flavor text
        return text;
    }

    /**
     * Retrives additional bonus added on to natural attack roll. Examples include:
     * Strength, Dexterity, Proficiency Bonus, Buffs, Class abilities
     * @returns The bonus
     */
    protected abstract attackBonus(user: Creature): number;

    /**
     * Generate flavor text that varies between attacks.
     * @param name The name of the attacking creature
     * @param naturalRoll The natural roll on a d20
     * @param bonus The attack bonus added to the roll to calculate the total attack roll
     * @returns The flavor text that summarizes the attack, without knowing if it hits.
     */
    protected abstract initiateAttackText(roll: number): string;

    /**
     * Called if the target creature is determined to be hit. Applies damage and conditions.
     * Could do multiple things. If only applies damage, applies damage and returns flavor text.
     * If forces saving throw, forces save and returns flavor text after determining consequence.
     * @param user The creature initiating the attack
     * @param target The creature targeted by the attack
     * @returns The flavor text that summarizes the result of the attack, including its effects on the target.
     */
    protected abstract applyEffect(user: Creature, target: Creature): string;
}

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