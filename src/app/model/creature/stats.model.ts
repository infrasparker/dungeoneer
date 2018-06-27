export abstract class Stats {

    /**
     * @protected Tuple for stat container indexed from 0-5; ordered STR, DEX, CON, INT, WIS, CHA
     */
    protected abstract baseStats: [number, number, number, number, number, number];

    /**
     * Physical power.
     * @returns strength score
     */
    protected baseStrengthScore(): number {
        return this.baseStats[0];
    }

    /**
     * Finesse and precision.
     * @returns dexterity score
     */
    protected baseDexterityScore(): number {
        return this.baseStats[1];
    }

    /**
     * Endurance and vitality.
     * @returns constitution score
     */
    protected baseConstitutionScore(): number {
        return this.baseStats[2];
    }

    /**
     * Mental capability, memory, and learning.
     * @returns intelligence score
     */
    protected baseIntelligenceScore(): number {
        return this.baseStats[3];
    }

    /**
     * Instinct and awareness.
     * @returns wisdom score
     */
    protected baseWisdomScore(): number {
        return this.baseStats[4];
    }

    /**
     * Appearance, personality, and amiability.
     * @returns charisma score
     */
    protected baseCharismaScore(): number {
        return this.baseStats[5];
    }

    /**
     * Vestigial support for old D&D stat system
     * @param score stat score from old system
     * @returns stat mod
     */
    protected static scoreToMod(score: number): number {
        return Math.floor((score - 10) / 2);
    }
}