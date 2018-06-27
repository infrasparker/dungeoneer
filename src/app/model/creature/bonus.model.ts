export class Bonus {
    public value: number; // Total bonus to be applied to property.
    private counter: number; // Duration that bonus lasts in turns; -1 for infinite.

    /**
     * Constructor for bonus object
     * @param value bonus
     * @param counter duration
     */
    constructor(value: number, counter: number) {
        this.value = value;
        this.counter = counter;
    }

    /**
     * Decreases the counter by 1 on call.
     * @returns true if the counter reached 0; false otherwise.
     */
    public decrement(): boolean {
        this.counter--;
        return this.counter === 0 ? true : false;
    }
}

export class BonusContainer {
    // Stats
    public strength:            Bonus[];
    public dexterity:           Bonus[];
    public constitution:        Bonus[];
    public intelligence:        Bonus[];
    public wisdom:              Bonus[];
    public charisma:            Bonus[];

    // Saves
    public strengthSave:        Bonus[];
    public dexteritySave:       Bonus[];
    public constitutionSave:    Bonus[];
    public intelligenceSave:    Bonus[];
    public wisdomSave:          Bonus[];
    public charismaSave:        Bonus[];

    // Hit Points
    public maxHP:               Bonus[];

    // Armor Class
    public dodgeAC:             Bonus[];
    public blockAC:             Bonus[];

    // Offensive
    public attack:              Bonus[];

    // Damage Resistance
    public arcane:              Bonus[];
    public bludgeoning:         Bonus[];
    public corrosion:           Bonus[];
    public divine:              Bonus[];
    public fire:                Bonus[];
    public frost:               Bonus[];
    public laceration:          Bonus[];
    public lightning:           Bonus[];
    public necrotic:            Bonus[];
    public toxic:               Bonus[];

    constructor() { }

    public addBonus(key: string, bonus: Bonus) {
        this[key].push(bonus);
    }

    public static total(arr: Bonus[]): number {
        let sum = 0;
        arr.forEach((bonus: Bonus) => {
            sum += bonus.value;
        });
        return sum;
    }
}