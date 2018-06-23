import { Adventurer } from "../adventurer.model";
import { DamageResistance } from "../../../mechanics/damage.model";
import { ConditionResistance } from "../../../mechanics/condition.model";
import { AttackRoll, Buff } from "../../ability.model";
import { Creature } from "../../creature.model";
import { DiceRoll } from "../../../mechanics/roll.model";
import { Armor } from "../../../mechanics/armor.model";
import { Effect_ACBonus, Effect_AttackBonus } from "../../../mechanics/effect.model";

export class Footman extends Adventurer {
    constructor(name: string,
        str?: number, dex?: number, con?: number, int?: number, wis?: number, cha?: number,
        level?: number
    ) {
        super(name, str, dex, con, int, wis, cha, level);
        this.className = "Footman";
        this.classDescription = "They like swords and shields, helmets and chestpieces, broccoli and beef";
    }

    public defendFromAttackRoll(roll: number): [boolean, string] {
        let dodgeCap: number = 10 + this.acDexBonus();
        if (roll < 8)
            return [false, "The attack missed."];
        else if (roll < dodgeCap)
            return [false, this.name + "dodged the attack."];
        else if (roll < this.ac() + this.acBonus)
            return [false, this.name + "blocked the attack."];
        else
            return [true, "The attack landed."];
    }

    // public takeDamage(damages: [string, number][]): string {
    //     let text: string = "";
    //     damages.forEach(pair => {
    //         let totalDamage: number = pair[1] - Math.floor(pair[1] * this.damageResistances[pair[0]]);
    //         if (totalDamage < 0)
    //             text += this.name + " heals for " + totalDamage + " hit points.";
    //         else
    //             if (this.blocking)
    //                 totalDamage = Math.floor(totalDamage * .5);
    //             text += this.name + " takes " + totalDamage + " points of " + pair[0] + " damage.";
    //         this.changeHP(-totalDamage);
    //     });
    //     return text;
    // }

    public startTurn(): void {

    }

    public endTurn(): void {

    }

    protected generateHitDice(): void {
        this.hitDice = new DiceRoll(this.level, 10);
    }

    protected generateSavingThrows(): void {
        this.strengthSave = true;
        this.dexteritySave = false;
        this.constitutionSave = true;
        this.intelligenceSave = false;
        this.wisdomSave = false;
        this.charismaSave = false;
    }

    protected generateArmor(): void {
        this.armor = new Armor(3, 2, true);
    }

    protected generateAbilities(): void {
        this.abilities = [new Slash(), new Hold(), new Charge(), new Rally()];
    }

    protected generateDamageResistances(): void {
        this.damageResistances = DamageResistance.generateDefaultDamageResistances();
    }

    protected generateConditionResistances(): void {
        this.conditionResistances = ConditionResistance.generateDefaultConditionResistances();
    }
}

class Slash extends AttackRoll {
    private damageDice: DiceRoll;

    constructor() {
        super("Slash", "Swing and pray", false, false, true);
        this.damageDice = new DiceRoll(1, 6);
    }

    protected attackBonus(user: Footman): number {
        return user.strength + user.proficiencyBonus + user.attackBonus;
    }

    protected initiateAttackText(roll: number): string {
        return name + " lashes out with their sword (" + roll + ").";
    }

    protected applyEffect(user: Footman, target: Creature): string {
        let damage: number = this.damageDice.roll() + user.strength;
        return target.takeDamage([["laceration", damage]]);
    }

    public display(): string {
        return "Swing forward at a target, dealing 1d6+STR laceration damage.";
    }
}

class Hold extends Buff {
    constructor() {
        super("Hold", "Live to fight another turn... maybe", false, true, false);
    }

    public applyBuff(user: Footman, target: Footman): string {
        (new Effect_ACBonus(5, 1)).apply(user);
        return user.name + " puts forth their shield at the ready.";
    }

    public display(): string {
        return "Lower your sword and raise your shield, gaining +5 AC for a turn."
    }
}

class Charge extends AttackRoll {
    private damageDice: DiceRoll;

    constructor() {
        super("Reckless Charge", "BREAKTHEIRRANKS!", false, false, true);
        this.damageDice = new DiceRoll(1, 10);
    }

    protected attackBonus(user: Footman): number {
        return user.strength + user.proficiencyBonus + user.attackBonus;
    }

    protected initiateAttackText(roll: number): string {
        return name + " lunges forward with a wild swing (" + roll + ").";
    }

    protected applyEffect(user: Footman, target: Creature): string {
        let damage: number = this.damageDice.roll() + user.strength;
        (new Effect_ACBonus(3, 1)).apply(user);
        (new Effect_ACBonus(3, 1)).apply(target);
        return target.takeDamage([["laceration", damage]]);
    }

    public display(): string {
        return "Charge, dealing 1d10+STR laceration damage and lowering both your ACs by 3 for a turn.";
    }
}

class Rally extends Buff {
    constructor() {
        super("Rally", "Invoke your inner bard", true, false, false);
    }

    public applyBuff(user: Footman, target: Creature): string {
        (new Effect_AttackBonus(5, 1)).apply(target);
        return user.name + " calls out confidently to " + target.name + ".";
    }

    public display(): string {
        return "Shout words of encouragement to an ally, giving them +5 to attack for a turn.";
    }
}