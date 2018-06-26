import { Stats } from "./stats.model";
import { Ability } from "./ability.model";
import { DamageResistance } from "../mechanics/damage.model";
import { ConditionResistance } from "../mechanics/condition.model";
import { Armor } from "../item/armor.model";
import { DiceRoll } from "../mechanics/roll.model";
import { BonusContainer } from "./bonus.model";

export abstract class Creature extends Stats {
    // Information about the creature
    public name: string; // Name of creature
    public race: string; // Race of creature
    public background: string; // Creature background

    // Hit points and hit dice
    public hp: number; // Current hit points
    public hp_max: number; // Maximum hit points
    public hp_temp: number; // Temporary hit points
    public hitDice: DiceRoll; // Hit dice used to calculate max hit points

    // Armor class and armor
    public ac_natural: number // Natural armor
    public armor: Armor; // Armor, if wearing armor; undefined if not. May be broken down later?

    // Proficiency
    public proficiencyBonus: number;
    public proficiencies: string[];

    // Saving throws
    public saves: [boolean, boolean, boolean, boolean, boolean, boolean]; // Saving throw array

    public abilities: [Ability, Ability, Ability, Ability]; // Can have up to 4 abilities

    public damageResistances: DamageResistance; // A JS object that contains damage type name keys mapped to resistance values from 0.0 to 1.0
    
    public conditionResistances: ConditionResistance; // A JS object that contains condition type name keys mapped to resistance values from 0.0 to 1.0

    public bonuses: BonusContainer;

    constructor(
        name: string,
        str?: number, dex?: number, con?: number, int?: number, wis?: number, cha?: number
    ) {
        super(str, dex, con, int, wis, cha);
        this.name = name;
        this.generateHitDice();
        this.generateHP();
        this.generateArmor();
        this.generateProficiency();
        this.generateSavingThrows();
        this.generateAbilities();
        this.generateDamageResistances();
        this.generateConditionResistances();
        this.bonuses = new BonusContainer();
    }



    // ====================================================================
    // Object initialization and generation methods
    // ====================================================================

    /**
     * Generates creature hit dice. Varies based on what creature it is used to construct.
     */
    protected abstract generateHitDice(): void;

    /**
     * Generates hit points and hit point maximum using hit dice rolls and constitution modifier.
     */
    protected generateHP(): void {
        this.hp_max = this.hitDice.roll() + this.hitDice.amount * this.constitution();
        this.hp = this.hp_max;
    }

    /**
     * Generates armor and armor class values depending on the creature, not including shields.
     */
    protected abstract generateArmor(): void;

    protected abstract generateProficiency(): void;

    /**
     * Generates saving throw array.
     */
    protected abstract generateSavingThrows(): void;

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

    /**
     * Getter for calculated strength mod. Should be overriden.
     * @returns total strength mod
     */
    public strength(): number {
        return this.baseStrength();
    }

    /**
     * Getter for calculated dexterity mod. Should be overriden.
     * @returns total dexterity mod
     */
    public dexterity(): number {
        return this.baseDexterity();
    }

    /**
     * Getter for calculated constitution mod. Should be overriden.
     * @returns total constitution mod
     */
    public constitution(): number {
        return this.baseConstitution();
    }

    /**
     * Getter for calculated intelligence mod. Should be overriden.
     * @returns total intelligence mod
     */
    public intelligence(): number {
        return this.baseIntelligence();
    }

    /**
     * Getter for calculated wisdom mod. Should be overriden.
     * @returns total wisdom mod
     */
    public wisdom(): number {
        return this.baseWisdom();
    }

    /**
     * Getter for calculated charisma mod. Should be overriden.
     * @returns total charisma mod
     */
    public charisma(): number {
        return this.baseCharisma();
    }

    // ===================================================================================

    /**
     * Retrieves maximum hit points including any current bonuses.
     * @returns max hit points
     */
    public maxHP(): number {
        return this.hp_max + this.bonuses.bonus("hp_max");
    }

    /**
     * Calculates the bonus to AC from dexterity, considering armor.
     * @returns The AC bonus.
     */
    public ac_dexBonus(): number {
        return (this.armor.maxDex === -1) ? this.dexterity() : Math.min(this.armor.maxDex, this.dexterity());
    }

    /**
     * Retrieves the AC value from only the creature's dexterity mod.
     * Used to choose between blocking, dodging, or missing flavor text.
     * @returns dodge AC
     */
    public dexAC(): number {
        return 10 + this.ac_dexBonus();
    }

    /**
     * Retrieves the blocking AC, which is also the full AC.
     * @returns AC
     */
    public blockAC(): number {
        return Math.max(this.ac_natural + this.dexterity(), this.armor.ac + this.ac_dexBonus()) + this.bonuses.bonus("ac");
    }

    // =================================================================================

    /**
     * Retrieves strength saving throw bonus.
     * @returns strength save
     */
    public strengthSave(): number {
        return this.strength() + (this.saves[0] ? this.proficiencyBonus : 0) + this.bonuses.bonus("strengthSave");
    }

    /**
     * Retrieves dexterity saving throw bonus.
     * @returns dexterity save
     */
    public dexteritySave(): number {
        return this.dexterity() + (this.saves[1] ? this.proficiencyBonus : 0) + this.bonuses.bonus("dexteritySave");
    }

    /**
     * Retrieves constitution saving throw bonus.
     * @returns constitution save
     */
    public constitutionSave(): number {
        return this.constitution() + (this.saves[2] ? this.proficiencyBonus : 0) + this.bonuses.bonus("constitutionSave");
    }

    /**
     * Retrieves intelligence saving throw bonus.
     * @returns intelligence save
     */
    public intelligenceSave(): number {
        return this.intelligence() + (this.saves[3] ? this.proficiencyBonus : 0) + this.bonuses.bonus("intelligenceSave");
    }

    /**
     * Retrieves wisdom saving throw bonus.
     * @returns wisdom save
     */
    public wisdomSave(): number {
        return this.wisdom() + (this.saves[4] ? this.proficiencyBonus : 0) + this.bonuses.bonus("wisdomSave");
    }

    /**
     * Retrieves charisma saving throw bonus.
     * @returns charisma save
     */
    public charismaSave(): number {
        return this.charisma() + (this.saves[5] ? this.proficiencyBonus : 0) + this.bonuses.bonus("charismaSave");
    }

    // ===========================================================================

    public getDamageResistance(key: string): number {
        return this.damageResistances[key] + this.bonuses[key];
    }
}