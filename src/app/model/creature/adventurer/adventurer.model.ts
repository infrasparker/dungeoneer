import { Creature } from "../creature.model";
import { Race } from "./races/race.model";
import { Size } from "../../mechanics/size.model";
import { DiceRoll } from "../../mechanics/roll.model";
import { Stats } from "../stats.model";
import { BonusContainer } from "../bonus.model";

export abstract class Adventurer extends Creature {
    public name: string;
    public baseStats: [number, number, number, number, number, number];

    public abstract className: string;
    public abstract classDescription: string;

    public race: string;
    public raceBonuses: [number, number, number, number, number, number]
    public age: number;
    public size: Size;
    public height: number;
    public languages: string[];
    
    public exp: number;
    public nextExp: number;
    public level: number;

    constructor() {
        super();
        let r: Race = Race.randRace();

        this.name = r.generateName();
        
        let statRoll = new DiceRoll(4, 6);
        this.baseStats = [statRoll.roll(), statRoll.roll(), statRoll.roll(), statRoll.roll(), statRoll.roll(), statRoll.roll()];

        this.race = r.name;
        this.raceBonuses = r.bonuses;
        this.age = r.generateAge();
        this.size = r.size;
        this.height = r.generateHeight();
        this.languages = r.generateLanguages();

        this.exp = 0;
        this.nextExp = 300;
        this.level = 1;
    }

    // ===============================================================
    // Property retrieving methods
    // ===============================================================

    public proficiencyBonus(): number {
        if (this.level <= 4)
            return 2;
        else if (this.level <= 8)
            return 3;
        else if (this.level <= 12)
            return 4;
        else if (this.level <= 16)
            return 5;
        else
            return 6;
    }

    /**
     * Getter for calculated strength mod. Should be overriden.
     * @returns total strength mod
     */
    public strengthMod(): number {
        return Stats.scoreToMod(this.baseStrengthScore() + this.raceBonuses[0]) + BonusContainer.total(this.bonuses.strength);
    }

    /**
     * Getter for calculated dexterity mod. Should be overriden.
     * @returns total dexterity mod
     */
    public dexterityMod(): number {
        return Stats.scoreToMod(this.baseDexterityScore() + this.raceBonuses[1]) + BonusContainer.total(this.bonuses.dexterity);
    }

    /**
     * Getter for calculated constitution mod. Should be overriden.
     * @returns total constitution mod
     */
    public constitutionMod(): number {
        return Stats.scoreToMod(super.baseConstitutionScore() + this.raceBonuses[2]) + BonusContainer.total(this.bonuses.constitution);
    }

    /**
     * Getter for calculated intelligence mod. Should be overriden.
     * @returns total intelligence mod
     */
    public intelligenceMod(): number {
        return Stats.scoreToMod(this.baseIntelligenceScore() + this.raceBonuses[3]) + BonusContainer.total(this.bonuses.intelligence);
    }

    /**
     * Getter for calculated wisdom mod. Should be overriden.
     * @returns total wisdom mod
     */
    public wisdomMod(): number {
        return Stats.scoreToMod(this.baseWisdomScore() + this.raceBonuses[4]) + BonusContainer.total(this.bonuses.wisdom);
    }

    /**
     * Getter for calculated charisma mod. Should be overriden.
     * @returns total charisma mod
     */
    public charismaMod(): number {
        return Stats.scoreToMod(this.baseCharismaScore() + this.raceBonuses[5]) + BonusContainer.total(this.bonuses.charisma);
    }
}