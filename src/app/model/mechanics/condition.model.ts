export class ConditionResistance {
    constructor(
        public blinded:         number, // Impairment of sight
        public charmed:         number, // Infatuation of some sort
        public crippled:        number, // Unable to use parts of the body
        public frightened:      number, // Fear
        public frozen:          number, // Frozen in ice
        public paralyzed:       number, // Conscious, but unable to move
        public petrified:       number, // Frozen in stone
        public poisoned:        number, // Afflicted by toxins
        public slowed:          number, // Inhibited by something
        public stunned:         number, // Woozy and sluggish
    ) { }

    public static generateDefaultConditionResistances(): ConditionResistance {
        return new ConditionResistance(0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
}