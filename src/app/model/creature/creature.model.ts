import { Stats } from "./stats.model";
import { Ability } from "./ability.model";
import { DamageResistance } from "../mechanics/damage.model";
import { ConditionResistance } from "../mechanics/condition.model";
import { Armor } from "../item/armor.model";
import { DiceRoll } from "../mechanics/roll.model";
import { BonusContainer } from "./bonus.model";

export abstract class Creature extends Stats {
    /**
     * @public creature name
     */
    public abstract name: string;

    public abstract hp: number; // Current hit points
    protected abstract hp_rolls: number; // Hit points rolled from hit dice
    public abstract hp_temp: number; // Temporary hit points
    public abstract hitDice: DiceRoll; // Hit dice used to calculate max hit points

    // Armor class and armor
    public abstract ac_natural: number // Natural armor
    public abstract armor: Armor; // Armor, if wearing armor; undefined if not. May be broken down later?

    // Proficiencies
    public abstract proficiencies: string[];

    // Saving throws
    public abstract saves: [boolean, boolean, boolean, boolean, boolean, boolean]; // Saving throw array

    public abstract abilities: [Ability, Ability, Ability, Ability]; // Can have up to 4 abilities

    public abstract damageResistances: DamageResistance; // A JS object that contains damage type name keys mapped to resistance values from 0.0 to 1.0
    
    public abstract conditionResistances: ConditionResistance; // A JS object that contains condition type name keys mapped to resistance values from 0.0 to 1.0

    public abstract bonuses: BonusContainer;

    // ===============================================================
    // Property retrieving methods
    // ===============================================================

    public abstract proficiencyBonus(): number;

    /**
     * Getter for calculated strength mod.
     * @returns total strength mod
     */
    public abstract strengthMod(): number;

    /**
     * Getter for calculated dexterity mod.
     * @returns total dexterity mod
     */
    public abstract dexterityMod(): number;

    /**
     * Getter for calculated constitution mod.
     * @returns total constitution mod
     */
    public abstract constitutionMod(): number;

    /**
     * Getter for calculated intelligence mod.
     * @returns total intelligence mod
     */
    public abstract intelligenceMod(): number;

    /**
     * Getter for calculated wisdom mod.
     * @returns total wisdom mod
     */
    public abstract wisdomMod(): number;

    /**
     * Getter for calculated charisma mod.
     * @returns total charisma mod
     */
    public abstract charismaMod(): number

    // ===================================================================================

    /**
     * Retrieves maximum hit points including any current bonuses.
     * @returns max hit points
     */
    public maxHP(): number {
        return this.hp_rolls + this.hitDice.amount * this.constitutionMod() + BonusContainer.total(this.bonuses.maxHP);
    }

    /**
     * Calculates the bonus to AC from dexterity, considering armor.
     * @returns The AC bonus.
     */
    public ac_dexBonus(): number {
        if (this.armor) {
            if (this.armor.maxDex !== -1)
                return Math.min(this.armor.maxDex, this.dexterityMod());
        }
        return this.dexterityMod();
    }

    /**
     * Retrieves the AC value from only the creature's dexterity mod.
     * Used to choose between blocking, dodging, or missing flavor text.
     * @returns dodge AC
     */
    public dodgeAC(): number {
        return 10 + this.ac_dexBonus() + BonusContainer.total(this.bonuses.dodgeAC);
    }

    /**
     * Retrieves the blocking AC, which is also the full AC.
     * @returns AC
     */
    public blockAC(): number {
        return Math.max(this.ac_natural + this.dexterityMod(), this.armor.ac + this.ac_dexBonus()) +
            BonusContainer.total(this.bonuses.dodgeAC) + BonusContainer.total(this.bonuses.blockAC);
    }

    // =================================================================================

    /**
     * Retrieves strength saving throw bonus.
     * @returns strength save
     */
    public strengthSave(): number {
        return this.strengthMod() + (this.saves[0] ? this.proficiencyBonus() : 0) + BonusContainer.total(this.bonuses.strengthSave);
    }

    /**
     * Retrieves dexterity saving throw bonus.
     * @returns dexterity save
     */
    public dexteritySave(): number {
        return this.dexterityMod() + (this.saves[1] ? this.proficiencyBonus() : 0) + BonusContainer.total(this.bonuses.dexteritySave);
    }

    /**
     * Retrieves constitution saving throw bonus.
     * @returns constitution save
     */
    public constitutionSave(): number {
        return this.constitutionMod() + (this.saves[2] ? this.proficiencyBonus() : 0) + BonusContainer.total(this.bonuses.constitutionSave);
    }

    /**
     * Retrieves intelligence saving throw bonus.
     * @returns intelligence save
     */
    public intelligenceSave(): number {
        return this.intelligenceMod() + (this.saves[3] ? this.proficiencyBonus() : 0) + BonusContainer.total(this.bonuses.intelligenceSave);
    }

    /**
     * Retrieves wisdom saving throw bonus.
     * @returns wisdom save
     */
    public wisdomSave(): number {
        return this.wisdomMod() + (this.saves[4] ? this.proficiencyBonus() : 0) + BonusContainer.total(this.bonuses.wisdomSave);
    }

    /**
     * Retrieves charisma saving throw bonus.
     * @returns charisma save
     */
    public charismaSave(): number {
        return this.charismaMod() + (this.saves[5] ? this.proficiencyBonus() : 0) + BonusContainer.total(this.bonuses.charismaSave);
    }

    // ===========================================================================

    public getDamageResistance(key: string): number {
        return this.damageResistances[key] + this.bonuses[key];
    }
}