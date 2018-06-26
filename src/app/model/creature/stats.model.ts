export abstract class Stats {
    private baseStats: [number, number, number, number, number, number];

    /**
     * Creates the Stat object using modifiers for all 6 standard stats, usually from -5 to +5.
     * @param strength      STR mod
     * @param dexterity     DEX mod
     * @param constitution  CON mod
     * @param intelligence  INT mod
     * @param wisdom        WIS mod
     * @param charisma      CHA mod
     */
    constructor(
    strength:        number = 0,
    dexterity:       number = 0,
    constitution:    number = 0,
    intelligence:    number = 0,
    wisdom:          number = 0,
    charisma:        number = 0,
    ) {
        this.baseStats = [strength, dexterity, constitution, intelligence, wisdom, charisma];
    }

    /**
     * Physical power.
     * @returns strength mod
     */
    public baseStrength(): number {
        return this.baseStats[0];
    }

    /**
     * Finesse and precision.
     * @returns dexterity mod
     */
    public baseDexterity(): number {
        return this.baseStats[1];
    }

    /**
     * Endurance and vitality.
     * @returns constitution mod
     */
    public baseConstitution(): number {
        return this.baseStats[2];
    }

    /**
     * Mental capability, memory, and learning.
     * @returns intelligence mod
     */
    public baseIntelligence(): number {
        return this.baseStats[3];
    }

    /**
     * Instinct and awareness.
     * @returns wisdom mod
     */
    public baseWisdom(): number {
        return this.baseStats[4];
    }

    /**
     * Appearance, personality, and amiability.
     * @returns charisma mod
     */
    public baseCharisma(): number {
        return this.baseStats[5];
    }

    /**
     * Vestigial support for old D&D stat system
     * @param score stat score from old system
     * @returns stat mod for updated system
     */
    public static convertObsolete(score: number): number {
        return Math.floor((score - 10) / 2);
    }
}