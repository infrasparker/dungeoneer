import { Stats } from "./stats.model";
import { Ability } from "./ability.model";
import { DamageResistance } from "../mechanics/damage.model";
import { ConditionResistance } from "../mechanics/condition.model";
import { Armor } from "../mechanics/armor.model";
import { DiceRoll } from "../mechanics/roll.model";
import { Effect } from "../mechanics/effect.model";

export abstract class Creature {
    public name: string; // Name of creature

    public armor: Armor; // Armor
    public acBonus: number;

    public attackBonus: number;

    public tempHP: number;
    public hitDice: DiceRoll;

    public strengthSave:        boolean;
    public dexteritySave:       boolean;
    public constitutionSave:    boolean;
    public intelligenceSave:    boolean;
    public wisdomSave:          boolean;
    public charismaSave:        boolean;

    public proficiencyBonus: number;

    public abilities: [Ability, Ability, Ability, Ability]; // Can have up to 4 abilities

    public damageResistances: DamageResistance; // A JS object that contains damage type name keys mapped to resistance values from 0.0 to 1.0
    
    public conditionResistances: ConditionResistance; // A JS object that contains condition type name keys mapped to resistance values from 0.0 to 1.0

    public effects: Effect[];

    constructor(
        name: string,
        str?: number, dex?: number, con?: number, int?: number, wis?: number, cha?: number
    ) {
        super(str, dex, con, int, wis, cha);
        this.name = name;
        this.generateHitDice();
        this.generateHP();
        this.generateSavingThrows();
        this.generateArmor();
        this.generateAbilities();
        this.generateDamageResistances();
        this.generateConditionResistances();
    }

    /**
     * Determines whether or not the creature would be hit by an incoming attack roll,
     * and generates flavor text depending on the result. Can be overridden for additional
     * functionality.
     * @param roll The value of the attack roll the creature is defending against.
     * @returns A tuple containing a boolean representing whether or not the creature was hit, and the flavor text.
     */
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

    public takeDamage(damages: [string, number][]): string {
        let text: string = "";
        damages.forEach(pair => {
            let totalDamage: number = pair[1] - pair[1] * this.damageResistances[pair[0]];
            if (totalDamage < 0) {
                text += this.name + " heals for " + totalDamage + " hit points.";
                this.changeHP(-totalDamage);
            }
            else {
                text += this.name + " takes " + totalDamage + " points of " + pair[0] + " damage.";
                if (totalDamage > this.tempHP) {
                    totalDamage -= this.tempHP;
                    this.tempHP = 0;
                    this.changeHP(-totalDamage);
                } else {
                    totalDamage = 0;
                    this.tempHP -= totalDamage;
                }
            }
        });
        return text;
    }

    protected changeHP(change: number): void {
        this.hp = Math.min(this.hp + change, this.maxHP);
    }

    /**
     * Calculates the bonus to AC from dexterity, considering armor.
     * @returns The AC bonus.
     */
    public acDexBonus(): number {
        return (this.armor.maxDex === -1) ? this.dexterity : Math.min(this.armor.maxDex, this.dexterity);
    }

    /**
     * The creature's AC. Can be overridden for additional functionality.
     */
    public ac(): number {
        return this.armor.ac + this.acDexBonus();
    }

    public startTurn(): void {
        this.effects.forEach(effect => {
            effect.update(this);
        });
    }

    public abstract endTurn(): void;

    protected generateHP(): void {
        this.maxHP = this.hitDice.roll() + this.hitDice.amount * this.constitution;
        this.hp = this.maxHP;
    }

    protected abstract generateHitDice(): void;

    protected abstract generateSavingThrows(): void;

    protected abstract generateArmor(): void;

    /**
     * Generates list of abilities that the creature can use, implemented by class
     */
    protected abstract generateAbilities(): void;

    /**
     * Generates JS object of resistances to damage by key: value pair
     */
    protected abstract generateDamageResistances(): void;

    /**
     * Generates JS object of resistances to conditions by key: value pair
     */
    protected abstract generateConditionResistances(): void;

    // ===============================================================
    // Property retrieving methods
    // ===============================================================

    public maxHP(): number {

    }
}