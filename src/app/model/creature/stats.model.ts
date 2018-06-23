export class Stats {
    public strength:        number; // Physical power
    public dexterity:       number; // Finesse and precision
    public constitution:    number; // Endurance and vitality
    public intelligence:    number; // Mental capability, memory, and learning
    public wisdom:          number; // Instinct and awareness
    public charisma:        number; // Appearance, personality, and amiability

    constructor(
    strength:        number = 10,
    dexterity:       number = 10,
    constitution:    number = 10,
    intelligence:    number = 10,
    wisdom:          number = 10,
    charisma:        number = 10,
    ) {
        this.strength       = strength;
        this.dexterity      = dexterity;
        this.constitution   = constitution;
        this.intelligence   = intelligence;
        this.wisdom         = wisdom;
        this.charisma       = charisma;
    }

    public static convertObsolete(score: number): number {
        return Math.floor((score - 10) / 2);
    }
}